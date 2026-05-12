// Public dashboard screen variants.
// PublicDashboard       — default loaded state with rail + grid + telemetry + timeline
// PublicDashboardDrawer — detail drawer open over the grid
// PublicDashboardLoading — skeleton/scanning state
// PublicDashboardEmpty   — filtered empty state
// PublicDashboardError   — uplink error state

function StatusRail({ active = 'ALL', counts }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 10, letterSpacing: '.24em', color: 'var(--color-signal-dim)', padding: '4px 6px' }}>STATUS RAIL</div>
      {STATUS_FILTERS.map((s) => {
        const isActive = s === active;
        const c = s === 'ALL' ? null : STATUS_COLOR[s];
        return (
          <button key={s} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
            padding: '8px 10px', cursor: 'pointer', background: isActive ? 'rgba(0,180,216,.12)' : 'transparent',
            border: `1px solid ${isActive ? 'var(--color-cyber-blue)' : 'var(--color-stellar-border)'}`,
            clipPath: 'var(--clip-button)', boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
            color: isActive ? 'var(--color-star-white)' : 'var(--color-ice-blue)',
            fontFamily: 'var(--font-orbitron)', fontWeight: 600, fontSize: 11, letterSpacing: '.18em',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {c ? <span style={{ width: 6, height: 6, background: c.dot, display: 'inline-block' }}/> : <span style={{ width: 6, height: 6 }}/>}
              {s}
            </span>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: isActive ? 'var(--color-neon-cyan)' : 'var(--color-signal-dim)' }}>
              {String(counts[s] ?? 0).padStart(2, '0')}
            </span>
          </button>
        );
      })}

      <div style={{ height: 14 }}/>
      <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 10, letterSpacing: '.24em', color: 'var(--color-signal-dim)', padding: '4px 6px' }}>CATEGORY</div>
      {CATEGORY_FILTERS.map((s) => (
        <button key={s} style={{
          textAlign: 'left', padding: '6px 10px', cursor: 'pointer', background: 'transparent',
          border: 'none', borderLeft: '2px solid transparent',
          color: s === 'ALL' ? 'var(--color-star-white)' : 'var(--color-ice-blue)',
          fontFamily: 'var(--font-rajdhani)', fontWeight: 500, fontSize: 12, letterSpacing: '.1em',
          borderLeftColor: s === 'ALL' ? 'var(--color-cyber-blue)' : 'transparent',
        }}>{s}</button>
      ))}
    </div>
  );
}

function ReadoutColumn() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      <XGQuantumReadout value={5} label="ACTIVE MISSIONS" color="green" size="md"/>
      <XGQuantumReadout value={1} label="FAILING NODES" color="red" size="md"/>
      <XGQuantumReadout value={1} label="DEPLOY QUEUED" color="cyan" size="md"/>
      <XGQuantumReadout value={2} label="STALE SIGNALS" color="purple" size="md"/>
    </div>
  );
}

function DashboardLayout({ children, activeFilter = 'ALL', missionCount = 9, syncTime = '14:32:07', filterSummary = 'ALL · 9 PROJECTS', railCounts, mainOverride, telemetryOverride, timelineOverride }) {
  // Compute defaults if not provided
  const counts = railCounts || {
    ALL: PROJECTS.length,
    LIVE: PROJECTS.filter(p => p.status === 'LIVE').length,
    BUILDING: PROJECTS.filter(p => p.status === 'BUILDING').length,
    REVIEW: PROJECTS.filter(p => p.status === 'REVIEW').length,
    BLOCKED: PROJECTS.filter(p => p.status === 'BLOCKED').length,
    STALE: PROJECTS.filter(p => p.status === 'STALE').length,
    ARCHIVED: PROJECTS.filter(p => p.status === 'ARCHIVED').length,
  };
  return (
    <div className="xg-canvas">
      <XGCommandStrip syncTime={syncTime} missionCount={missionCount} activeFilterSummary={filterSummary}/>

      {/* Main grid: rail | center | telemetry */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 320px', gap: 16, padding: 16 }}>
        <div>
          <StatusRail active={activeFilter} counts={counts}/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Readouts row */}
          <ReadoutColumn/>
          {/* Section title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: 16, letterSpacing: '.18em', color: 'var(--color-star-white)' }}>PROJECT MISSION GRID</span>
              <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.16em' }}>// SORTED BY FEATURED + ORDER</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <XGChip label="FEATURED FIRST" active/>
              <XGChip label="A → Z"/>
              <XGChip label="RECENT"/>
            </div>
          </div>
          {mainOverride || children}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {telemetryOverride || <XGTelemetryLog entries={TELEMETRY.slice(0, 8)}/>}
        </div>
      </div>

      {/* Timeline panel below */}
      <div style={{ padding: '0 16px 16px' }}>
        {timelineOverride || <XGTimeline entries={TIMELINE.slice(0, 7)}/>}
      </div>
    </div>
  );
}

function MissionGrid({ projects, onSelect, columns = 3 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 12 }}>
      {projects.map((p) => <XGMissionCard key={p.id} project={p} onClick={() => onSelect && onSelect(p)}/>)}
    </div>
  );
}

// ── Public Dashboard — default ─────────────────────────────────────────
function PublicDashboard() {
  return (
    <DashboardLayout>
      <MissionGrid projects={PROJECTS} columns={3}/>
    </DashboardLayout>
  );
}

// ── Public Dashboard — detail drawer open ─────────────────────────────
function ProjectDetailDrawer({ project }) {
  return (
    <div style={{
      position: 'absolute', top: 60, right: 16, bottom: 16, width: 480,
      background: 'var(--color-deep-space)', border: '1px solid var(--color-cyber-blue)',
      boxShadow: 'var(--glow-cyan), -16px 0 60px rgba(0,0,0,.6)',
      clipPath: 'var(--clip-panel)', zIndex: 5,
      display: 'flex', flexDirection: 'column',
    }}>
      <div className="xg-corner-tl"/><div className="xg-corner-tr"/><div className="xg-corner-bl"/><div className="xg-corner-br"/>
      <div className="xg-scanlines"/>
      {/* Header */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-stellar-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, background: 'rgba(10,42,74,.35)' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.22em' }}>
            SCANNER PANEL · {project.id.toUpperCase()}
          </div>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 18, color: 'var(--color-star-white)', letterSpacing: '.06em', marginTop: 4 }}>
            {project.name}
          </div>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
            <XGStatus status={project.status} size="lg"/>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)' }}>
              · {project.category}
            </span>
          </div>
        </div>
        <button style={{
          width: 32, height: 32, background: 'transparent', cursor: 'pointer',
          border: '1px solid var(--color-stellar-border)', color: 'var(--color-ice-blue)',
          fontFamily: 'var(--font-space-mono)', fontSize: 16, clipPath: 'var(--clip-button)',
        }}>×</button>
      </div>

      {/* Body */}
      <div style={{ overflow: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        {/* Description */}
        <div>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 10, letterSpacing: '.24em', color: 'var(--color-signal-dim)', marginBottom: 6 }}>// TRANSMISSION</div>
          <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 14, lineHeight: 1.55, color: 'var(--color-star-white)', margin: 0, opacity: .92 }}>
            {project.description}
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
          <a style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px',
            background: 'var(--color-nebula-navy)', border: '1px solid var(--color-stellar-border)', clipPath: 'var(--clip-button)', textDecoration: 'none' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--color-cyber-blue)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a11 11 0 0 0-3.5 21.4c.5.1.7-.2.7-.5v-2.1c-3.1.7-3.7-1.3-3.7-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1.9-.2 1.8-.4 2.7-.4.9 0 1.8.1 2.7.4 2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v3c0 .3.2.6.7.5A11 11 0 0 0 12 1Z"/></svg>
              </span>
              <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 12, color: 'var(--color-ice-blue)' }}>{project.githubUrl}</span>
            </span>
            <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: 10, color: 'var(--color-cyber-blue)', letterSpacing: '.2em' }}>OPEN ▸</span>
          </a>
          {project.demoUrl && (
            <a style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px',
              background: 'var(--color-nebula-navy)', border: '1px solid var(--color-stellar-border)', clipPath: 'var(--clip-button)', textDecoration: 'none' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="xg-pulse" style={{ width: 8, height: 8, background: 'var(--color-bio-green)', display: 'inline-block', color: 'var(--color-bio-green)' }}/>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 12, color: 'var(--color-bio-green)' }}>{project.demoUrl}</span>
              </span>
              <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: 10, color: 'var(--color-cyber-blue)', letterSpacing: '.2em' }}>VISIT ▸</span>
            </a>
          )}
        </div>

        {/* Tech stack */}
        <div>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 10, letterSpacing: '.24em', color: 'var(--color-signal-dim)', marginBottom: 8 }}>// PROPULSION STACK</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.techStack.map((t) => <XGTechTag key={t}>{t}</XGTechTag>)}
          </div>
        </div>

        {/* History */}
        <div>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 10, letterSpacing: '.24em', color: 'var(--color-signal-dim)', marginBottom: 8 }}>// SIGNAL HISTORY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderLeft: '1px solid var(--color-stellar-border)' }}>
            {project.history.map((h, i) => (
              <div key={i} style={{ padding: '8px 0 8px 14px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: -5, top: 12, width: 8, height: 8, transform: 'rotate(45deg)',
                  background: i === 0 ? 'var(--color-cyber-blue)' : 'var(--color-phantom-grey)',
                  boxShadow: i === 0 ? 'var(--glow-cyan)' : 'none' }}/>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.1em' }}>{h.date}</span>
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontWeight: 700, fontSize: 11, color: i === 0 ? 'var(--color-cyber-blue)' : 'var(--color-ice-blue)', letterSpacing: '.12em' }}>{h.event}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 12, color: 'var(--color-star-white)', opacity: .85, marginTop: 2 }}>{h.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Meta */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, paddingTop: 8, borderTop: '1px dashed var(--color-stellar-border)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.2em' }}>SLUG</div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)' }}>{project.slug}</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.2em' }}>UPDATED</div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)' }}>{project.lastUpdatedAt}</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.2em' }}>SORT</div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)' }}>#{String(project.sortOrder).padStart(2, '0')}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-stellar-border)', display: 'flex', justifyContent: 'space-between', gap: 8, background: 'rgba(2,8,16,.6)' }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.16em', alignSelf: 'center' }}>
          ESC TO CLOSE · ◀ ▶ TO NAVIGATE
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <XGBtn>VISIT REPO</XGBtn>
          {project.demoUrl && <XGBtn variant="primary">LAUNCH DEMO</XGBtn>}
        </div>
      </div>
    </div>
  );
}

function PublicDashboardDrawer() {
  const featured = PROJECTS.find(p => p.id === 'p02'); // Stripe Dashboard
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <DashboardLayout>
        <MissionGrid projects={PROJECTS} columns={2}/>
      </DashboardLayout>
      <ProjectDetailDrawer project={featured}/>
    </div>
  );
}

// ── Public Dashboard — loading ────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="xg-card" style={{ padding: 14, minHeight: 220, display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', overflow: 'hidden' }}>
      <div className="xg-scanlines"/>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ height: 8, width: '40%', background: 'var(--color-stellar-border)', marginBottom: 6 }}/>
          <div className="xg-flicker" style={{ height: 14, width: '70%', background: 'var(--color-phantom-grey)' }}/>
        </div>
        <div style={{ height: 18, width: 64, background: 'var(--color-phantom-grey)' }}/>
      </div>
      <div style={{ height: 10, width: '85%', background: 'var(--color-stellar-border)' }}/>
      <div style={{ height: 10, width: '60%', background: 'var(--color-stellar-border)' }}/>
      <div style={{ height: 8, width: '90%', background: 'rgba(10,42,74,.6)' }}/>
      <div style={{ height: 8, width: '75%', background: 'rgba(10,42,74,.6)' }}/>
      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
        {[0,1,2,3].map((i) => <div key={i} style={{ height: 14, width: 48, background: 'var(--color-stellar-border)' }}/>)}
      </div>
      <div style={{ marginTop: 'auto', borderTop: '1px dashed var(--color-stellar-border)', paddingTop: 10 }}>
        <div style={{ height: 10, width: '50%', background: 'var(--color-stellar-border)' }}/>
      </div>
    </div>
  );
}

function PublicDashboardLoading() {
  return (
    <DashboardLayout
      syncTime="--:--:--"
      filterSummary="ACQUIRING SIGNAL…"
      mainOverride={
        <>
          {/* Scanning banner */}
          <div className="xg-panel" style={{ padding: '14px 20px', borderColor: 'var(--color-cyber-blue)', boxShadow: 'var(--glow-cyan)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="xg-pulse" style={{ width: 12, height: 12, background: 'var(--color-neon-cyan)', color: 'var(--color-neon-cyan)' }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 13, letterSpacing: '.2em', color: 'var(--color-star-white)' }}>ACQUIRING TELEMETRY</div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)', marginTop: 2 }}>
                pinging /api/projects · attempt 01 of 03 · timeout 4.20s
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-doto)', fontWeight: 900, fontSize: 28, color: 'var(--color-neon-cyan)', textShadow: 'var(--glow-cyan)' }} className="xg-flicker">42%</div>
            <div style={{ width: 140, height: 6, background: 'var(--color-nebula-navy)', border: '1px solid var(--color-stellar-border)' }}>
              <div style={{ height: '100%', width: '42%', background: 'var(--gradient-bioluminescent)', boxShadow: 'var(--glow-green)' }}/>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[0,1,2,3,4,5].map((i) => <SkeletonCard key={i}/>)}
          </div>
        </>
      }
      telemetryOverride={
        <div className="xg-panel">
          <div className="xg-panel-header">
            <div className="xg-panel-title">TELEMETRY LOG</div>
            <div className="xg-panel-sub xg-flicker">CONNECTING…</div>
          </div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[0,1,2,3,4,5,6].map((i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 90px 1fr', gap: 8 }}>
                <div style={{ height: 8, background: 'var(--color-stellar-border)' }}/>
                <div style={{ height: 8, background: 'var(--color-phantom-grey)' }}/>
                <div style={{ height: 8, background: 'var(--color-stellar-border)', width: `${60 + (i*5)%30}%` }}/>
              </div>
            ))}
          </div>
        </div>
      }/>
  );
}

// ── Public Dashboard — empty filtered ─────────────────────────────────
function PublicDashboardEmpty() {
  return (
    <DashboardLayout
      activeFilter="BLOCKED"
      filterSummary="STATUS · BLOCKED + EXPERIMENT"
      mainOverride={
        <div className="xg-panel" style={{ padding: 56, textAlign: 'center', minHeight: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, position: 'relative' }}>
          <div className="xg-hex" style={{ position: 'absolute', inset: 0, opacity: .4 }}/>
          {/* Decorative scan icon */}
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'relative' }}>
            <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="var(--color-stellar-border)" strokeWidth="1"/>
            <polygon points="40,16 64,28 64,52 40,64 16,52 16,28" fill="none" stroke="var(--color-cyber-blue)" strokeWidth="1" strokeDasharray="3 3"/>
            <line x1="40" y1="4" x2="40" y2="76" stroke="var(--color-cyber-blue)" strokeWidth="0.5" opacity=".4"/>
            <line x1="4" y1="40" x2="76" y2="40" stroke="var(--color-cyber-blue)" strokeWidth="0.5" opacity=".4"/>
            <circle cx="40" cy="40" r="3" fill="var(--color-neon-cyan)" style={{ filter: 'drop-shadow(0 0 6px var(--color-neon-cyan))' }}/>
          </svg>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.22em' }}>// SCAN_RESULT: 0x000</div>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 22, letterSpacing: '.12em', color: 'var(--color-star-white)' }}>NO MISSIONS IN RANGE</div>
          <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 14, color: 'var(--color-ice-blue)', maxWidth: 480, lineHeight: 1.5 }}>
            Filter <span style={{ color: 'var(--color-alert-red)' }}>BLOCKED</span> + category <span style={{ color: 'var(--color-cyber-blue)' }}>EXPERIMENT</span> returned no nodes. Either narrow the search or release the filter to bring the full grid back into view.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <XGBtn variant="primary" icon={<span>↻</span>}>RESET FILTERS</XGBtn>
            <XGBtn>VIEW ALL · 09</XGBtn>
          </div>
        </div>
      }/>
  );
}

// ── Public Dashboard — uplink error ───────────────────────────────────
function PublicDashboardError() {
  return (
    <DashboardLayout
      syncTime="??:??:??"
      filterSummary="UPLINK LOST"
      mainOverride={
        <div className="xg-panel" style={{ borderColor: 'var(--color-alert-red)', boxShadow: 'var(--glow-red)', padding: 32, minHeight: 360,
          display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
          <div className="xg-scanlines"/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 64, height: 64, border: '2px solid var(--color-alert-red)', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)', display: 'grid', placeItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: 28, color: 'var(--color-alert-red)' }}>!</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-alert-red)', letterSpacing: '.2em', fontWeight: 700 }}>ERR · 0x503_UPLINK_LOST</div>
              <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: 26, color: 'var(--color-star-white)', letterSpacing: '.08em', marginTop: 4 }}>SIGNAL LOST</div>
              <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 14, color: 'var(--color-ice-blue)', marginTop: 6 }}>
                The grid cannot reach <span style={{ fontFamily: 'var(--font-space-mono)', color: 'var(--color-star-white)' }}>api.jacky.dev</span>. Cached telemetry shown below may be stale.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <XGBtn variant="primary">↻ RETRY UPLINK</XGBtn>
              <XGBtn>VIEW CACHED</XGBtn>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            <div className="xg-panel" style={{ padding: 12, background: 'rgba(255,31,78,.08)', borderColor: 'rgba(255,31,78,.4)' }}>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-alert-red)', letterSpacing: '.2em' }}>STATUS</div>
              <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, color: 'var(--color-star-white)', marginTop: 4, fontSize: 13 }}>503 SERVICE UNAVAILABLE</div>
            </div>
            <div className="xg-panel" style={{ padding: 12 }}>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.2em' }}>LAST OK</div>
              <div style={{ fontFamily: 'var(--font-space-mono)', color: 'var(--color-ice-blue)', marginTop: 4, fontSize: 13 }}>14:32:07 UTC</div>
            </div>
            <div className="xg-panel" style={{ padding: 12 }}>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.2em' }}>RETRIES</div>
              <div style={{ fontFamily: 'var(--font-space-mono)', color: 'var(--color-plasma-orange)', marginTop: 4, fontSize: 13 }}>03 / 03 EXHAUSTED</div>
            </div>
          </div>

          {/* Trace */}
          <div style={{ background: 'var(--color-void-black)', padding: 12, border: '1px solid var(--color-stellar-border)', fontFamily: 'var(--font-space-mono)', fontSize: 11, lineHeight: 1.6 }}>
            <span style={{ color: 'var(--color-signal-dim)' }}>{'>'}</span> <span style={{ color: 'var(--color-ice-blue)' }}>GET api.jacky.dev/v1/projects</span><br/>
            <span style={{ color: 'var(--color-signal-dim)' }}>{'>'}</span> <span style={{ color: 'var(--color-alert-red)' }}>{'<'} TIMEOUT after 4200ms</span><br/>
            <span style={{ color: 'var(--color-signal-dim)' }}>{'>'}</span> <span style={{ color: 'var(--color-ice-blue)' }}>retry 1/3 → 503</span><br/>
            <span style={{ color: 'var(--color-signal-dim)' }}>{'>'}</span> <span style={{ color: 'var(--color-ice-blue)' }}>retry 2/3 → 503</span><br/>
            <span style={{ color: 'var(--color-signal-dim)' }}>{'>'}</span> <span style={{ color: 'var(--color-alert-red)' }}>retry 3/3 → CONNECTION REFUSED</span>
          </div>
        </div>
      }/>
  );
}

Object.assign(window, {
  DashboardLayout, MissionGrid, StatusRail,
  PublicDashboard, PublicDashboardDrawer, PublicDashboardLoading,
  PublicDashboardEmpty, PublicDashboardError, ProjectDetailDrawer,
});
