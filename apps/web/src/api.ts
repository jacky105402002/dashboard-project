import { projects as fallbackProjects } from './data';
import type { Project, ProjectStatus } from './types';

type ApiProject = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: string | null;
  status: 'PLANNING' | 'BUILDING' | 'LIVE' | 'PAUSED' | 'BLOCKED' | 'ARCHIVED';
  category: string;
  githubUrl: string | null;
  demoUrl: string | null;
  techStack: string[];
  isPublic: boolean;
  isFeatured: boolean;
  sortOrder: number;
  lastUpdatedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function toUiStatus(status: ApiProject['status']): ProjectStatus {
  if (status === 'PLANNING') return 'REVIEW';
  if (status === 'PAUSED') return 'STALE';
  return status;
}

function formatDate(value: string | null) {
  if (!value) return 'UNKNOWN';
  return value.slice(0, 10);
}

function getFallbackProject(slug: string) {
  return fallbackProjects.find((project) => project.slug.toLowerCase() === slug.toLowerCase());
}

function toProject(apiProject: ApiProject): Project {
  const fallback = getFallbackProject(apiProject.slug);
  const status = toUiStatus(apiProject.status);

  return {
    id: apiProject.id,
    name: apiProject.name.toUpperCase(),
    slug: apiProject.slug,
    summary: apiProject.summary,
    description: apiProject.description ?? apiProject.summary,
    status,
    category: apiProject.category,
    githubUrl: apiProject.githubUrl ?? '#',
    demoUrl: apiProject.demoUrl,
    techStack: apiProject.techStack,
    isPublic: apiProject.isPublic,
    isFeatured: apiProject.isFeatured,
    sortOrder: apiProject.sortOrder,
    lastUpdatedAt: formatDate(apiProject.lastUpdatedAt ?? apiProject.updatedAt),
    nextAction: fallback?.nextAction ?? (status === 'LIVE' ? 'Monitor signal health' : 'Review next build step'),
    history: fallback?.history ?? [
      {
        date: formatDate(apiProject.updatedAt),
        event: status,
        note: 'Loaded from PostgreSQL API',
      },
    ],
  };
}

export async function fetchPublicProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/projects/public`);

  if (!response.ok) {
    throw new Error(`Project API returned ${response.status}`);
  }

  const apiProjects = (await response.json()) as ApiProject[];
  return apiProjects.map(toProject);
}
