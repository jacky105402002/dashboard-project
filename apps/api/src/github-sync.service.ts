import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

type GitHubCommit = {
  html_url: string;
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
};

@Injectable()
export class GithubSyncService {
  constructor(private readonly prisma: PrismaService) {}

  async syncProjectCommits(projectId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      throw new BadRequestException(`Project ${projectId} was not found.`);
    }
    if (!project.githubUrl) {
      throw new BadRequestException('Project does not have a GitHub URL.');
    }

    const repo = parseGithubRepo(project.githubUrl);
    if (!repo) {
      throw new BadRequestException('GitHub URL must look like https://github.com/owner/repo.');
    }

    const commits = await fetchGithubCommits(repo.owner, repo.name);
    const events = await Promise.all(
      commits.map((commit) =>
        this.prisma.projectEvent.upsert({
          where: {
            projectId_source_url: {
              projectId,
              source: 'github',
              url: commit.html_url,
            },
          },
          update: {
            event: 'GITHUB COMMIT',
            note: firstLine(commit.commit.message),
            occurredAt: new Date(commit.commit.author.date),
          },
          create: {
            projectId,
            source: 'github',
            event: 'GITHUB COMMIT',
            note: firstLine(commit.commit.message),
            url: commit.html_url,
            occurredAt: new Date(commit.commit.author.date),
          },
        }),
      ),
    );

    await this.prisma.project.update({
      where: { id: projectId },
      data: { lastUpdatedAt: commits[0] ? new Date(commits[0].commit.author.date) : project.lastUpdatedAt },
    });

    return {
      projectId,
      repo: `${repo.owner}/${repo.name}`,
      synced: events.length,
      events,
    };
  }
}

function parseGithubRepo(url: string) {
  const normalized = url.replace(/\.git$/, '');
  const match = normalized.match(/^https:\/\/github\.com\/([^/]+)\/([^/#?]+)(?:[/?#].*)?$/i);
  if (!match) return null;
  return { owner: match[1], name: match[2] };
}

async function fetchGithubCommits(owner: string, repo: string): Promise<GitHubCommit[]> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'dashboard-project-api',
    },
  });

  if (!response.ok) {
    throw new BadRequestException(`GitHub API returned ${response.status} for ${owner}/${repo}.`);
  }

  return response.json() as Promise<GitHubCommit[]>;
}

function firstLine(message: string) {
  return message.split('\n')[0].slice(0, 180);
}
