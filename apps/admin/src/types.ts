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

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN';
};

export type AuthPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = AuthPayload & {
  name: string;
};
