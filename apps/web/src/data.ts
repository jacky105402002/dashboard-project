import type { Project, ProjectStatus, TelemetryEntry, TimelineEntry } from './types';

export const statusFilters = ['ALL', 'LIVE', 'BUILDING', 'REVIEW', 'BLOCKED', 'STALE', 'ARCHIVED'] as const;
export const categoryFilters = ['ALL', 'WEB APP', 'API', 'TOOL', 'EXPERIMENT', 'AUTOMATION', 'DESIGN SYSTEM'] as const;

export const projects: Project[] = [
  {
    id: 'p01',
    name: 'DASHBOARD PROJECT',
    slug: 'dashboard-project',
    summary: "Mission-control dashboard for Jacky's public projects, demos, and operational status.",
    description:
      'API-first dashboard with public project cards, admin editing, status filters, telemetry readouts, and a PostgreSQL-backed NestJS API planned for Zeabur deployment.',
    status: 'BUILDING',
    category: 'WEB APP',
    githubUrl: 'https://github.com/jacky105402002/dashboard-project',
    demoUrl: null,
    techStack: ['React', 'Vite', 'NestJS', 'Prisma', 'PostgreSQL'],
    isPublic: true,
    isFeatured: true,
    sortOrder: 1,
    lastUpdatedAt: '2026-05-14',
    nextAction: 'Ship public dashboard MVP',
    history: [
      { date: '2026-05-14', event: 'BUILDING', note: 'React web app scaffold started' },
      { date: '2026-05-12', event: 'DESIGN READY', note: 'Claude Design and Stitch exports archived' },
    ],
  },
  {
    id: 'p02',
    name: 'ENGINEER POST WRITER',
    slug: 'engineer-post-writer',
    summary: 'Codex skill workflow for turning engineering work into structured public writing.',
    description:
      'A reusable writing workflow for creating engineering posts from implementation context, demo artifacts, and technical decisions.',
    status: 'LIVE',
    category: 'TOOL',
    githubUrl: 'https://github.com/jacky105402002/engineer-post-writer',
    demoUrl: null,
    techStack: ['Codex Skill', 'Markdown', 'Workflow'],
    isPublic: true,
    isFeatured: true,
    sortOrder: 2,
    lastUpdatedAt: '2026-05-06',
    nextAction: 'Add more example outputs',
    history: [
      { date: '2026-05-06', event: 'LIVE', note: 'Initial public workflow published' },
    ],
  },
  {
    id: 'p03',
    name: 'MVP POC SPEC BUILDER',
    slug: 'mvp-poc-spec-builder',
    summary: 'Spec-building workflow for turning product ideas into MVP/POC implementation plans.',
    description:
      'A planning system that captures product goals, narrows MVP scope, and produces implementation-ready specifications.',
    status: 'LIVE',
    category: 'AUTOMATION',
    githubUrl: 'https://github.com/jacky105402002/mvp-poc-spec-builder',
    demoUrl: null,
    techStack: ['Codex Skill', 'Markdown', 'AItogo'],
    isPublic: true,
    isFeatured: false,
    sortOrder: 3,
    lastUpdatedAt: '2026-05-05',
    nextAction: 'Connect sample project records',
    history: [
      { date: '2026-05-05', event: 'LIVE', note: 'Initial MVP POC spec builder added' },
    ],
  },
  {
    id: 'p04',
    name: 'UI WRITER',
    slug: 'UI-writer',
    summary: 'UI writing and product copy workflow for AI-assisted interface design.',
    description:
      'A public workflow repository focused on interface text, product structure, and AI-supported UI writing decisions.',
    status: 'REVIEW',
    category: 'DESIGN SYSTEM',
    githubUrl: 'https://github.com/jacky105402002/UI-writer',
    demoUrl: null,
    techStack: ['Markdown', 'Prompting', 'Design Docs'],
    isPublic: true,
    isFeatured: false,
    sortOrder: 4,
    lastUpdatedAt: '2026-05-04',
    nextAction: 'Review naming and examples',
    history: [
      { date: '2026-05-04', event: 'REVIEW', note: 'Public workflow draft available' },
    ],
  },
  {
    id: 'p05',
    name: 'RESILIENCE HUB OS DEMO',
    slug: 'resilience-hub-os-demo',
    summary: 'Demo prototype and annotated system design record for resilience operations.',
    description:
      'A prototype-style record showing how product demos, SDD notes, and implementation artifacts can be archived together.',
    status: 'STALE',
    category: 'EXPERIMENT',
    githubUrl: 'https://github.com/jacky105402002/dashboard-project',
    demoUrl: null,
    techStack: ['Wireframes', 'SDD', 'Prototype'],
    isPublic: true,
    isFeatured: false,
    sortOrder: 5,
    lastUpdatedAt: '2026-05-03',
    nextAction: 'Decide whether to split into its own repo',
    history: [
      { date: '2026-05-03', event: 'STALE', note: 'Demo archived as planning reference' },
    ],
  },
  {
    id: 'p06',
    name: 'AUTH SERVICE',
    slug: 'auth-service',
    summary: 'Placeholder service for future admin authentication and account management.',
    description:
      'Not implemented yet. This dashboard will eventually use admin auth for protected project CRUD screens.',
    status: 'BLOCKED',
    category: 'API',
    githubUrl: 'https://github.com/jacky105402002/dashboard-project',
    demoUrl: null,
    techStack: ['NestJS', 'JWT', 'PostgreSQL'],
    isPublic: true,
    isFeatured: false,
    sortOrder: 6,
    lastUpdatedAt: '2026-05-14',
    nextAction: 'Create auth endpoints after project API',
    history: [
      { date: '2026-05-14', event: 'BLOCKED', note: 'Waiting for API scaffold and schema migration' },
    ],
  },
];

export const telemetry: TelemetryEntry[] = [
  { time: '22:14:08', code: 'BUILDING', target: 'dashboard-project web scaffold', kind: 'ok' },
  { time: '22:08:34', code: 'DESIGN READY', target: 'claude-design github-dashboard', kind: 'ok' },
  { time: '21:57:12', code: 'EXPORT STORED', target: 'google-stitch mockups', kind: 'info' },
  { time: '21:22:49', code: 'API QUEUED', target: 'nestjs prisma zeabur', kind: 'warn' },
  { time: '20:46:11', code: 'DB TARGET', target: 'zeabur postgres DATABASE_URL', kind: 'info' },
  { time: '20:10:00', code: 'ANOMALY', target: 'admin auth pending', kind: 'err' },
];

export const timeline: TimelineEntry[] = [
  { date: '2026-05-14', project: 'DASHBOARD PROJECT', event: 'web app scaffold', status: 'BUILDING' },
  { date: '2026-05-12', project: 'CLAUDE DESIGN', event: 'mockups archived', status: 'LIVE' },
  { date: '2026-05-12', project: 'GOOGLE STITCH', event: 'screenshots archived', status: 'LIVE' },
  { date: '2026-05-06', project: 'AItogo', event: 'API-first decision', status: 'REVIEW' },
  { date: '2026-05-06', project: 'XENON GRID', event: 'design reference created', status: 'LIVE' },
];

export const statusTone: Record<ProjectStatus, { label: string; className: string }> = {
  LIVE: { label: 'LIVE', className: 'status-live' },
  BUILDING: { label: 'BUILDING', className: 'status-building' },
  REVIEW: { label: 'REVIEW', className: 'status-review' },
  BLOCKED: { label: 'BLOCKED', className: 'status-blocked' },
  STALE: { label: 'STALE', className: 'status-stale' },
  ARCHIVED: { label: 'ARCHIVED', className: 'status-archived' },
};
