export type ProjectStatus = 'LIVE' | 'BUILDING' | 'REVIEW' | 'BLOCKED' | 'STALE' | 'ARCHIVED';

export type Project = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  category: string;
  githubUrl: string;
  demoUrl: string | null;
  techStack: string[];
  isPublic: boolean;
  isFeatured: boolean;
  sortOrder: number;
  lastUpdatedAt: string;
  nextAction: string;
  history: Array<{
    date: string;
    event: string;
    note: string;
    url?: string | null;
  }>;
};

export type TelemetryEntry = {
  time: string;
  code: string;
  target: string;
  kind: 'ok' | 'err' | 'warn' | 'info';
};

export type TimelineEntry = {
  date: string;
  project: string;
  event: string;
  status: ProjectStatus;
};
