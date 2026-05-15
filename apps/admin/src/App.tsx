import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Database, Plus, RefreshCw, Save, Trash2 } from 'lucide-react';
import { createProject, deleteProject, getProjects, updateProject } from './api';
import type { Project, ProjectPayload, ProjectStatus } from './types';

const statuses: ProjectStatus[] = ['PLANNING', 'BUILDING', 'LIVE', 'PAUSED', 'BLOCKED', 'ARCHIVED'];

const emptyProject: ProjectPayload = {
  name: '',
  slug: '',
  summary: '',
  description: '',
  status: 'PLANNING',
  category: 'WEB APP',
  githubUrl: '',
  demoUrl: '',
  techStack: [],
  isPublic: true,
  isFeatured: false,
  sortOrder: 0,
  lastUpdatedAt: new Date().toISOString().slice(0, 10),
};

function toForm(project: Project): ProjectPayload {
  return {
    name: project.name,
    slug: project.slug,
    summary: project.summary,
    description: project.description ?? '',
    status: project.status,
    category: project.category,
    githubUrl: project.githubUrl ?? '',
    demoUrl: project.demoUrl ?? '',
    techStack: project.techStack,
    isPublic: project.isPublic,
    isFeatured: project.isFeatured,
    sortOrder: project.sortOrder,
    lastUpdatedAt: project.lastUpdatedAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
  };
}

function normalizePayload(payload: ProjectPayload): ProjectPayload {
  return {
    ...payload,
    name: payload.name.trim(),
    slug: payload.slug.trim(),
    summary: payload.summary.trim(),
    description: payload.description?.trim() || null,
    category: payload.category.trim(),
    githubUrl: payload.githubUrl?.trim() || null,
    demoUrl: payload.demoUrl?.trim() || null,
    techStack: payload.techStack.map((item) => item.trim()).filter(Boolean),
    sortOrder: Number(payload.sortOrder) || 0,
    lastUpdatedAt: payload.lastUpdatedAt || null,
  };
}

function formatDate(value: string | null) {
  return value ? value.slice(0, 10) : 'UNSET';
}

export function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectPayload>(emptyProject);
  const [techStackInput, setTechStackInput] = useState('');
  const [message, setMessage] = useState('Booting admin uplink...');
  const [isSaving, setIsSaving] = useState(false);

  const selectedProject = projects.find((project) => project.id === selectedId) ?? null;

  const stats = useMemo(() => {
    return {
      total: projects.length,
      public: projects.filter((project) => project.isPublic).length,
      live: projects.filter((project) => project.status === 'LIVE').length,
      blocked: projects.filter((project) => project.status === 'BLOCKED').length,
    };
  }, [projects]);

  async function loadProjects() {
    setMessage('Acquiring project registry...');
    const records = await getProjects();
    setProjects(records);
    setMessage(`Registry synced: ${records.length} projects`);

    if (!selectedId && records[0]) {
      setSelectedId(records[0].id);
      setForm(toForm(records[0]));
      setTechStackInput(records[0].techStack.join(', '));
    }
  }

  useEffect(() => {
    loadProjects().catch((error) => setMessage(`Signal lost: ${error.message}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectProject(project: Project) {
    setSelectedId(project.id);
    setForm(toForm(project));
    setTechStackInput(project.techStack.join(', '));
    setMessage(`Editing ${project.name}`);
  }

  function newProject() {
    setSelectedId(null);
    setForm({
      ...emptyProject,
      sortOrder: projects.length + 1,
      lastUpdatedAt: new Date().toISOString().slice(0, 10),
    });
    setTechStackInput('');
    setMessage('Creating new project record');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    const payload = normalizePayload({
      ...form,
      techStack: techStackInput.split(','),
    });

    try {
      const saved = selectedProject
        ? await updateProject(selectedProject.id, payload)
        : await createProject(payload);
      await loadProjects();
      setSelectedId(saved.id);
      setForm(toForm(saved));
      setTechStackInput(saved.techStack.join(', '));
      setMessage(`Saved ${saved.name}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  }

  async function removeProject() {
    if (!selectedProject) return;
    const confirmed = window.confirm(`Delete ${selectedProject.name}? This cannot be undone.`);
    if (!confirmed) return;

    await deleteProject(selectedProject.id);
    setSelectedId(null);
    setForm(emptyProject);
    setTechStackInput('');
    await loadProjects();
    setMessage(`Deleted ${selectedProject.name}`);
  }

  return (
    <main className="admin-canvas">
      <header className="admin-strip">
        <div className="brand">
          <Database size={24} />
          <div>
            <h1>XENON GRID ADMIN</h1>
            <p>PROJECT REGISTRY / POSTGRES CONTROL</p>
          </div>
        </div>
        <div className="strip-metrics">
          <span>TOTAL <strong>{stats.total}</strong></span>
          <span>PUBLIC <strong>{stats.public}</strong></span>
          <span>LIVE <strong>{stats.live}</strong></span>
          <span>BLOCKED <strong>{stats.blocked}</strong></span>
        </div>
        <button className="ghost-button" onClick={() => loadProjects()} type="button">
          <RefreshCw size={14} />
          Sync
        </button>
      </header>

      <section className="admin-grid">
        <aside className="registry-panel">
          <div className="panel-title">
            <div>
              <h2>PROJECT REGISTRY</h2>
              <p>{message}</p>
            </div>
            <button className="icon-button" onClick={newProject} type="button" aria-label="Create project">
              <Plus size={17} />
            </button>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <button
                className={selectedId === project.id ? 'project-row active' : 'project-row'}
                key={project.id}
                onClick={() => selectProject(project)}
                type="button"
              >
                <span>
                  <strong>{project.name}</strong>
                  <em>{project.slug}</em>
                </span>
                <span className={`status status-${project.status.toLowerCase()}`}>{project.status}</span>
              </button>
            ))}
          </div>
        </aside>

        <form className="editor-panel" onSubmit={submit}>
          <div className="panel-title">
            <div>
              <h2>MISSION EDITOR</h2>
              <p>{selectedProject ? selectedProject.id : 'NEW PROJECT'}</p>
            </div>
            <div className="editor-actions">
              {selectedProject && (
                <button className="danger-button" onClick={removeProject} type="button">
                  <Trash2 size={14} />
                  Delete
                </button>
              )}
              <button className="primary-button" disabled={isSaving} type="submit">
                <Save size={14} />
                {isSaving ? 'Saving' : 'Save'}
              </button>
            </div>
          </div>

          <div className="form-grid">
            <label>
              Name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
            </label>
            <label>
              Slug
              <input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} required />
            </label>
            <label>
              Status
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as ProjectStatus })}>
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </label>
            <label>
              Category
              <input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required />
            </label>
            <label className="span-2">
              Summary
              <textarea value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} required rows={3} />
            </label>
            <label className="span-2">
              Description
              <textarea value={form.description ?? ''} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={5} />
            </label>
            <label>
              GitHub URL
              <input value={form.githubUrl ?? ''} onChange={(event) => setForm({ ...form, githubUrl: event.target.value })} placeholder="https://github.com/..." />
            </label>
            <label>
              Demo URL
              <input value={form.demoUrl ?? ''} onChange={(event) => setForm({ ...form, demoUrl: event.target.value })} placeholder="https://..." />
            </label>
            <label className="span-2">
              Tech Stack
              <input value={techStackInput} onChange={(event) => setTechStackInput(event.target.value)} placeholder="React, NestJS, Prisma" />
            </label>
            <label>
              Sort Order
              <input type="number" min="0" value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) })} />
            </label>
            <label>
              Last Updated
              <input type="date" value={form.lastUpdatedAt?.slice(0, 10) ?? ''} onChange={(event) => setForm({ ...form, lastUpdatedAt: event.target.value })} />
            </label>
          </div>

          <div className="toggle-row">
            <label>
              <input type="checkbox" checked={form.isPublic} onChange={(event) => setForm({ ...form, isPublic: event.target.checked })} />
              Public
            </label>
            <label>
              <input type="checkbox" checked={form.isFeatured} onChange={(event) => setForm({ ...form, isFeatured: event.target.checked })} />
              Featured
            </label>
            <span>Updated {selectedProject ? formatDate(selectedProject.updatedAt) : 'AFTER SAVE'}</span>
          </div>
        </form>
      </section>
    </main>
  );
}
