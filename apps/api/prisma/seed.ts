import { PrismaClient, ProjectStatus } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    name: 'Dashboard Project',
    slug: 'dashboard-project',
    summary: "Mission-control dashboard for Jacky's public projects, demos, and operational status.",
    description:
      'API-first dashboard with public project cards, admin editing, status filters, telemetry readouts, and a PostgreSQL-backed NestJS API planned for Zeabur deployment.',
    status: ProjectStatus.BUILDING,
    category: 'WEB APP',
    githubUrl: 'https://github.com/jacky105402002/dashboard-project',
    demoUrl: null,
    techStack: ['React', 'Vite', 'NestJS', 'Prisma', 'PostgreSQL'],
    isPublic: true,
    isFeatured: true,
    sortOrder: 1,
    lastUpdatedAt: new Date('2026-05-14'),
  },
  {
    name: 'Engineer Post Writer',
    slug: 'engineer-post-writer',
    summary: 'Codex skill workflow for turning engineering work into structured public writing.',
    description:
      'A reusable writing workflow for creating engineering posts from implementation context, demo artifacts, and technical decisions.',
    status: ProjectStatus.LIVE,
    category: 'TOOL',
    githubUrl: 'https://github.com/jacky105402002/engineer-post-writer',
    demoUrl: null,
    techStack: ['Codex Skill', 'Markdown', 'Workflow'],
    isPublic: true,
    isFeatured: true,
    sortOrder: 2,
    lastUpdatedAt: new Date('2026-05-06'),
  },
  {
    name: 'MVP POC Spec Builder',
    slug: 'mvp-poc-spec-builder',
    summary: 'Spec-building workflow for turning product ideas into MVP/POC implementation plans.',
    description:
      'A planning system that captures product goals, narrows MVP scope, and produces implementation-ready specifications.',
    status: ProjectStatus.LIVE,
    category: 'AUTOMATION',
    githubUrl: 'https://github.com/jacky105402002/mvp-poc-spec-builder',
    demoUrl: null,
    techStack: ['Codex Skill', 'Markdown', 'AItogo'],
    isPublic: true,
    isFeatured: false,
    sortOrder: 3,
    lastUpdatedAt: new Date('2026-05-05'),
  },
  {
    name: 'UI Writer',
    slug: 'ui-writer',
    summary: 'UI writing and product copy workflow for AI-assisted interface design.',
    description:
      'A public workflow repository focused on interface text, product structure, and AI-supported UI writing decisions.',
    status: ProjectStatus.PLANNING,
    category: 'DESIGN SYSTEM',
    githubUrl: 'https://github.com/jacky105402002/UI-writer',
    demoUrl: null,
    techStack: ['Markdown', 'Prompting', 'Design Docs'],
    isPublic: true,
    isFeatured: false,
    sortOrder: 4,
    lastUpdatedAt: new Date('2026-05-04'),
  },
];

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
