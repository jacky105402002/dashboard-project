import type { Project, ProjectPayload } from './types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getProjects() {
  return request<Project[]>('/projects');
}

export function createProject(payload: ProjectPayload) {
  return request<Project>('/projects', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateProject(id: string, payload: ProjectPayload) {
  return request<Project>(`/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteProject(id: string) {
  return request<{ id: string; deleted: true }>(`/projects/${id}`, {
    method: 'DELETE',
  });
}

export function syncGithubProject(id: string) {
  return request<{ projectId: string; repo: string; synced: number }>(`/projects/${id}/sync-github`, {
    method: 'POST',
  });
}
