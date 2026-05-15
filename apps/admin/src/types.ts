export type ProjectStatus = 'PLANNING' | 'BUILDING' | 'LIVE' | 'PAUSED' | 'BLOCKED' | 'ARCHIVED';

export type Project = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: string | null;
  status: ProjectStatus;
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
  events?: Array<{
    id: string;
    source: string;
    event: string;
    note: string;
    url: string | null;
    occurredAt: string;
  }>;
};

export type ProjectPayload = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
