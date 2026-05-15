import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ExternalLink,
  Github,
  LayoutGrid,
  RefreshCw,
  Search,
  ShieldAlert,
  X,
} from 'lucide-react';
import {
  categoryFilters,
  projects as fallbackProjects,
  statusFilters,
  statusTone,
  telemetry,
  timeline,
} from './data';
import { fetchPublicProjects } from './api';
import type { Project, ProjectStatus } from './types';

type StatusFilter = (typeof statusFilters)[number];
type CategoryFilter = (typeof categoryFilters)[number];

function statusCounts(projects: Project[]) {
  return statusFilters.reduce<Record<string, number>>((acc, status) => {
    acc[status] = status === 'ALL' ? projects.length : projects.filter((project) => project.status === status).length;
    return acc;
  }, {});
}

function StatusBadge({ status, size = 'sm' }: { status: ProjectStatus; size?: 'sm' | 'lg' }) {
  const tone = statusTone[status];
  return (
    <span className={`status-badge ${tone.className} ${size === 'lg' ? 'status-badge-lg' : ''}`}>
      {status !== 'ARCHIVED' && <span className="status-dot" />}
      {tone.label}
    </span>
  );
}

function CommandStrip({
  missionCount,
  activeSummary,
}: {
  missionCount: number;
  activeSummary: string;
}) {
  return (
    <header className="command-strip">
      <div className="brand-lockup">
        <div className="brand-glyph" aria-hidden="true">
          <LayoutGrid size={22} />
        </div>
        <div>
          <h1>XENON GRID <span>/</span> JCHN-01</h1>
          <p>PUBLIC GRID / NODE.JACKY.PERSONAL</p>
        </div>
      </div>

      <div className="command-meta" aria-label="Dashboard telemetry">
        <div>
          <span>Last Sync</span>
          <strong>SYNC 22:14:08</strong>
        </div>
        <div>
          <span>Missions</span>
          <strong className="healthy">{String(missionCount).padStart(2, '0')} ACTIVE</strong>
        </div>
        <div>
          <span>Filter</span>
          <strong>{activeSummary}</strong>
        </div>
        <div>
          <span>Uplink</span>
          <strong className="healthy">STABLE</strong>
        </div>
      </div>

      <button className="ghost-button" type="button">
        <RefreshCw size={14} />
        Force Sync
      </button>
    </header>
  );
}

function StatusRail({
  activeStatus,
  projects,
  onStatusChange,
}: {
  activeStatus: StatusFilter;
  projects: Project[];
  onStatusChange: (status: StatusFilter) => void;
}) {
  const counts = statusCounts(projects);
  return (
    <aside className="status-rail" aria-label="Status filters">
      <p className="rail-heading">STATUS RAIL</p>
      <div className="rail-group">
        {statusFilters.map((status) => (
          <button
            className={`rail-button ${activeStatus === status ? 'active' : ''}`}
            key={status}
            onClick={() => onStatusChange(status)}
            type="button"
          >
            <span>{status}</span>
            <strong>{String(counts[status]).padStart(2, '0')}</strong>
          </button>
        ))}
      </div>
    </aside>
  );
}

function CategoryBar({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}) {
  return (
    <div className="category-bar" aria-label="Category filters">
      {categoryFilters.map((category) => (
        <button
          className={activeCategory === category ? 'active' : ''}
          key={category}
          onClick={() => onCategoryChange(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
}

function QuantumReadouts({ visibleProjects }: { visibleProjects: Project[] }) {
  const active = visibleProjects.filter((project) => project.status === 'LIVE' || project.status === 'BUILDING').length;
  const failing = visibleProjects.filter((project) => project.status === 'BLOCKED').length;
  const stale = visibleProjects.filter((project) => project.status === 'STALE' || project.status === 'ARCHIVED').length;
  const featured = visibleProjects.filter((project) => project.isFeatured).length;

  return (
    <section className="readout-grid" aria-label="Mission summary">
      <div className="readout readout-green">
        <strong>{active}</strong>
        <span>ACTIVE MISSIONS</span>
      </div>
      <div className="readout readout-red">
        <strong>{failing}</strong>
        <span>FAILING NODES</span>
      </div>
      <div className="readout readout-cyan">
        <strong>{featured}</strong>
        <span>FEATURED SIGNALS</span>
      </div>
      <div className="readout readout-purple">
        <strong>{stale}</strong>
        <span>STALE SIGNALS</span>
      </div>
    </section>
  );
}

function ProjectCard({ project, onSelect }: { project: Project; onSelect: (project: Project) => void }) {
  return (
    <article className={`project-card ${project.isFeatured ? 'featured' : ''}`}>
      <div className="card-topline">
        <StatusBadge status={project.status} />
        <span>{project.category}</span>
      </div>
      <button className="card-title" onClick={() => onSelect(project)} type="button">
        {project.name}
      </button>
      <p>{project.summary}</p>
      <div className="card-meta">
        <span>{project.slug}</span>
        <span>UPDATED {project.lastUpdatedAt}</span>
      </div>
      <div className="tech-stack">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className="next-action">
        <span>NEXT</span>
        <strong>{project.nextAction}</strong>
      </div>
      <div className="card-actions">
        <a href={project.githubUrl} target="_blank" rel="noreferrer">
          <Github size={14} />
          GitHub
        </a>
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={14} />
            Demo
          </a>
        ) : (
          <button disabled type="button">
            <ExternalLink size={14} />
            Local
          </button>
        )}
        <button onClick={() => onSelect(project)} type="button">
          <Search size={14} />
          Detail
        </button>
      </div>
    </article>
  );
}

function TelemetryLog() {
  return (
    <aside className="telemetry-panel">
      <div className="panel-header">
        <div>
          <h2>TELEMETRY</h2>
          <p>LIVE ACTIVITY STREAM</p>
        </div>
        <Activity size={18} />
      </div>
      <div className="telemetry-list">
        {telemetry.map((entry) => (
          <div className={`telemetry-row ${entry.kind}`} key={`${entry.time}-${entry.code}`}>
            <span>{entry.time}</span>
            <strong>{entry.code}</strong>
            <em>{entry.target}</em>
          </div>
        ))}
      </div>
    </aside>
  );
}

function TimelineRail() {
  return (
    <section className="timeline-panel">
      <div className="panel-header compact">
        <div>
          <h2>TIMELINE</h2>
          <p>CHRONOLOGICAL EVENT RAIL</p>
        </div>
      </div>
      <div className="timeline-track">
        {timeline.map((entry) => (
          <div className="timeline-node" key={`${entry.date}-${entry.project}`}>
            <span className={`timeline-diamond ${statusTone[entry.status].className}`} />
            <strong>{entry.date}</strong>
            <p>{entry.project}</p>
            <em>{entry.event}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectDetailDrawer({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="project-drawer" role="dialog" aria-modal="true" aria-labelledby="project-detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <p>SCANNER PANEL / {project.id.toUpperCase()}</p>
            <h2 id="project-detail-title">{project.name}</h2>
            <div className="drawer-status-line">
              <StatusBadge status={project.status} size="lg" />
              <span>{project.category}</span>
            </div>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="Close project details">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          <section>
            <h3>// TRANSMISSION</h3>
            <p>{project.description}</p>
          </section>

          <section>
            <h3>// LINKS</h3>
            <div className="drawer-links">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Github size={16} />
                {project.githubUrl.replace('https://', '')}
              </a>
              {project.demoUrl ? (
                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} />
                  {project.demoUrl}
                </a>
              ) : (
                <span>
                  <ShieldAlert size={16} />
                  DEMO LINK NOT ASSIGNED
                </span>
              )}
            </div>
          </section>

          <section>
            <h3>// STACK</h3>
            <div className="tech-stack large">
              {project.techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </section>

          <section>
            <h3>// HISTORY</h3>
            <div className="history-list">
              {project.history.map((item) => (
                <div key={`${item.date}-${item.event}`}>
                  <strong>{item.date}</strong>
                  <span>{item.event}</span>
                  <em>{item.note}</em>
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}

export function App() {
  const [activeStatus, setActiveStatus] = useState<StatusFilter>('ALL');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [dataSource, setDataSource] = useState<'api' | 'fallback' | 'loading'>('loading');

  useEffect(() => {
    let isMounted = true;

    fetchPublicProjects()
      .then((apiProjects) => {
        if (!isMounted) return;
        setProjects(apiProjects.length > 0 ? apiProjects : fallbackProjects);
        setDataSource(apiProjects.length > 0 ? 'api' : 'fallback');
      })
      .catch(() => {
        if (!isMounted) return;
        setProjects(fallbackProjects);
        setDataSource('fallback');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleProjects = useMemo(() => {
    return projects
      .filter((project) => activeStatus === 'ALL' || project.status === activeStatus)
      .filter((project) => activeCategory === 'ALL' || project.category === activeCategory)
      .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.sortOrder - b.sortOrder);
  }, [activeCategory, activeStatus]);

  const activeSummary = `${activeStatus} / ${activeCategory} / ${visibleProjects.length} PROJECTS`;

  return (
    <main className="xenon-canvas">
      <CommandStrip missionCount={projects.length} activeSummary={activeSummary} />

      <div className="dashboard-shell">
        <StatusRail activeStatus={activeStatus} projects={projects} onStatusChange={setActiveStatus} />

        <section className="mission-column">
          <div className={`data-source data-source-${dataSource}`}>
            DATA SOURCE / {dataSource === 'api' ? 'POSTGRES API' : dataSource === 'loading' ? 'ACQUIRING SIGNAL' : 'LOCAL FALLBACK'}
          </div>
          <QuantumReadouts visibleProjects={visibleProjects} />
          <div className="mission-heading">
            <div>
              <h2>PROJECT MISSION GRID</h2>
              <p>// SORTED BY FEATURED + ORDER</p>
            </div>
          </div>
          <CategoryBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          {visibleProjects.length > 0 ? (
            <div className="mission-grid">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <ShieldAlert size={30} />
              <h3>NO MISSIONS IN RANGE</h3>
              <p>Reset the filters to reacquire public project signals.</p>
              <button
                className="ghost-button"
                onClick={() => {
                  setActiveStatus('ALL');
                  setActiveCategory('ALL');
                }}
                type="button"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        <TelemetryLog />
      </div>

      <TimelineRail />

      {selectedProject && <ProjectDetailDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
