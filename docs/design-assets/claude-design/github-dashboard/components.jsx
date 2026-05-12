// Shared Xenon Grid components. Pure presentational unless noted.
// Loaded as a Babel script — every exported component is attached to window
// at the bottom.

const xgCss = `
.xg-canvas{background:var(--color-void-black);color:var(--color-star-white);font-family:var(--font-rajdhani);
  width:100%;height:100%;overflow:hidden;position:relative;
  background-image:
    linear-gradient(rgba(0,180,216,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,180,216,.04) 1px, transparent 1px);
  background-size:32px 32px;
}
.xg-canvas::before{content:"";position:absolute;inset:0;pointer-events:none;
  background-image:repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,.02) 2px, rgba(0,245,255,.02) 4px);
  z-index:0;
}
.xg-canvas::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(circle at 18% 12%, rgba(0,180,216,.08), transparent 45%),
             radial-gradient(circle at 88% 90%, rgba(124,58,237,.07), transparent 50%);
  z-index:0;
}
.xg-canvas > *{position:relative;z-index:1;}

.xg-strip{display:flex;align-items:stretch;gap:12px;padding:14px 20px;background:var(--color-void-black);
  border-bottom:1px solid var(--color-cyber-blue);box-shadow:inset 0 -1px 0 rgba(0,245,255,.15), 0 0 24px rgba(0,180,216,.18);}
.xg-strip-id{display:flex;align-items:center;gap:10px;padding-right:18px;border-right:1px solid var(--color-stellar-border);}
.xg-strip-id .lockup{display:flex;align-items:center;gap:8px;}
.xg-strip-id .glyph{width:22px;height:22px;display:grid;place-items:center;color:var(--color-neon-cyan);}
.xg-strip-id .name{font-family:var(--font-orbitron);font-weight:900;letter-spacing:.18em;color:var(--color-star-white);font-size:14px;line-height:1;}
.xg-strip-id .ver{font-family:var(--font-space-mono);font-size:9px;color:var(--color-signal-dim);letter-spacing:.1em;margin-top:3px;}
.xg-strip-meta{display:flex;align-items:center;gap:18px;}
.xg-meta-block{display:flex;flex-direction:column;gap:2px;padding:2px 10px;border-left:1px solid var(--color-stellar-border);}
.xg-meta-block:first-child{border-left:none;padding-left:0;}
.xg-meta-block .k{font-family:var(--font-space-mono);font-size:9px;color:var(--color-signal-dim);letter-spacing:.18em;text-transform:uppercase;}
.xg-meta-block .v{font-family:var(--font-space-mono);font-size:12px;color:var(--color-ice-blue);letter-spacing:.06em;}
.xg-meta-block .v.live{color:var(--color-bio-green);}
.xg-strip-actions{margin-left:auto;display:flex;gap:8px;align-items:center;}

.xg-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 10px;font-family:var(--font-orbitron);font-weight:600;
  font-size:10px;letter-spacing:.16em;color:var(--color-ice-blue);background:var(--color-nebula-navy);
  border:1px solid var(--color-stellar-border);clip-path:var(--clip-button);cursor:pointer;
  transition:color .12s, border-color .12s, box-shadow .12s, background .12s; text-transform:uppercase;}
.xg-chip:hover{color:var(--color-star-white);border-color:var(--color-cyber-blue);}
.xg-chip.active{color:var(--color-star-white);border-color:var(--color-cyber-blue);background:rgba(0,180,216,.12);box-shadow:var(--glow-cyan);}
.xg-chip .count{font-family:var(--font-space-mono);font-size:10px;color:var(--color-signal-dim);}
.xg-chip.active .count{color:var(--color-neon-cyan);}

.xg-btn{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;font-family:var(--font-orbitron);font-weight:700;
  font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;background:transparent;
  color:var(--color-ice-blue);border:1px solid var(--color-stellar-border);clip-path:var(--clip-button);
  transition:all .12s;}
.xg-btn:hover{color:var(--color-star-white);border-color:var(--color-cyber-blue);box-shadow:var(--glow-blue);}
.xg-btn.primary{color:var(--color-star-white);background:rgba(0,180,216,.14);border-color:var(--color-cyber-blue);box-shadow:var(--glow-cyan);}
.xg-btn.danger{color:var(--color-star-white);background:rgba(255,31,78,.14);border-color:var(--color-alert-red);}
.xg-btn.danger:hover{box-shadow:var(--glow-red);background:rgba(255,31,78,.22);}
.xg-btn.solid-cyan{color:var(--color-void-black);background:var(--color-cyber-blue);border-color:var(--color-cyber-blue);}
.xg-btn.solid-cyan:hover{background:var(--color-neon-cyan);box-shadow:var(--glow-cyan);}
.xg-btn.solid-danger{color:var(--color-star-white);background:var(--color-alert-red);border-color:var(--color-alert-red);}
.xg-btn.solid-danger:hover{box-shadow:var(--glow-red);}

.xg-status{display:inline-flex;align-items:center;gap:6px;padding:3px 8px;font-family:var(--font-space-mono);font-weight:700;
  font-size:10px;letter-spacing:.18em;border:1px solid currentColor;background:rgba(0,0,0,.4);}
.xg-status .dot{width:8px;height:8px;display:inline-block;}
.xg-status .bracket{font-family:var(--font-space-mono);font-weight:700;font-size:12px;line-height:1;}

.xg-card{background:var(--color-deep-space);border:1px solid var(--color-stellar-border);clip-path:var(--clip-card);
  position:relative;transition:border-color .12s, box-shadow .12s, transform .12s;}
.xg-card:hover{border-color:var(--color-cyber-blue);box-shadow:var(--glow-blue), inset 0 0 24px rgba(0,245,255,.04);}
.xg-card.featured::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:var(--gradient-warp);}
.xg-card.featured{box-shadow:0 0 0 1px rgba(0,180,216,.4), 0 0 28px rgba(124,58,237,.18);}

.xg-panel{background:var(--color-deep-space);border:1px solid var(--color-stellar-border);clip-path:var(--clip-panel);position:relative;}
.xg-panel.glow{border-color:var(--color-cyber-blue);box-shadow:var(--glow-cyan);}
.xg-panel-header{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;
  border-bottom:1px solid var(--color-stellar-border);background:rgba(10,42,74,.4);}
.xg-panel-title{font-family:var(--font-orbitron);font-weight:700;font-size:11px;letter-spacing:.22em;color:var(--color-star-white);}
.xg-panel-sub{font-family:var(--font-space-mono);font-size:10px;color:var(--color-signal-dim);letter-spacing:.12em;}

.xg-scanlines{position:absolute;inset:0;pointer-events:none;
  background-image:repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,.025) 2px, rgba(0,245,255,.025) 3px);}

@keyframes xenon-pulse {
  0%,100%{opacity:1;box-shadow:0 0 4px currentColor;}
  50%{opacity:.55;box-shadow:0 0 14px currentColor;}
}
@keyframes data-flicker {
  0%,92%,94%,100%{opacity:1;}
  93%{opacity:.4;}
  96%{opacity:.7;}
}
.xg-pulse{animation:xenon-pulse 2s ease-in-out infinite;}
.xg-flicker{animation:data-flicker 6s linear infinite;}

.xg-hex{background-image:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='100'><polygon points='28,2 54,16 54,44 28,58 2,44 2,16' fill='none' stroke='%2300b4d8' stroke-width='0.5' opacity='0.18'/></svg>");}

.xg-divider{display:flex;align-items:center;gap:8px;color:var(--color-signal-dim);font-family:var(--font-space-mono);font-size:10px;letter-spacing:.18em;}
.xg-divider::before,.xg-divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg, transparent, var(--color-stellar-border), transparent);}

input.xg-input, textarea.xg-input, select.xg-input{
  background:var(--color-void-black);border:1px solid var(--color-stellar-border);color:var(--color-star-white);
  font-family:var(--font-space-mono);font-size:12px;padding:9px 11px;width:100%;outline:none;letter-spacing:.04em;
  transition:border-color .12s, box-shadow .12s;
}
input.xg-input:focus, textarea.xg-input:focus, select.xg-input:focus{border-color:var(--color-cyber-blue);box-shadow:var(--glow-cyan);}
input.xg-input.error, textarea.xg-input.error{border-color:var(--color-alert-red);box-shadow:0 0 0 1px rgba(255,31,78,.3);}
.xg-field{display:flex;flex-direction:column;gap:6px;}
.xg-label{font-family:var(--font-orbitron);font-weight:600;font-size:10px;letter-spacing:.22em;color:var(--color-ice-blue);text-transform:uppercase;}
.xg-help{font-family:var(--font-space-mono);font-size:10px;color:var(--color-signal-dim);letter-spacing:.04em;}
.xg-help.error{color:var(--color-alert-red);}

.xg-corner-tl,.xg-corner-tr,.xg-corner-bl,.xg-corner-br{position:absolute;width:10px;height:10px;border:1px solid var(--color-cyber-blue);}
.xg-corner-tl{top:-1px;left:-1px;border-right:none;border-bottom:none;}
.xg-corner-tr{top:-1px;right:-1px;border-left:none;border-bottom:none;}
.xg-corner-bl{bottom:-1px;left:-1px;border-right:none;border-top:none;}
.xg-corner-br{bottom:-1px;right:-1px;border-left:none;border-top:none;}
`;

if (typeof document !== 'undefined' && !document.getElementById('xg-styles')) {
  const s = document.createElement('style'); s.id = 'xg-styles'; s.textContent = xgCss;
  document.head.appendChild(s);
}

// ─── Logo / Brand Glyph ──────────────────────────────────────────────────
function XGLogo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" />
      <polygon points="12,7 17,9.5 17,14.5 12,17 7,14.5 7,9.5" fill="currentColor" fillOpacity=".4"/>
      <circle cx="12" cy="12" r="1.5" fill="var(--color-neon-cyan)" stroke="none"/>
    </svg>
  );
}

// ─── Status Indicator ────────────────────────────────────────────────────
function XGStatus({ status, size = 'sm' }) {
  const c = STATUS_COLOR[status] || STATUS_COLOR.STALE;
  const padding = size === 'lg' ? '5px 12px' : '3px 8px';
  const fontSize = size === 'lg' ? '11px' : '10px';
  const pulse = status === 'LIVE' || status === 'BUILDING';
  return (
    <span className="xg-status" style={{ color: c.fg, padding, fontSize, boxShadow: c.glow !== 'none' ? c.glow : 'none' }}>
      {status === 'REVIEW' ? (
        <span className="bracket" style={{ color: c.dot }}>◇</span>
      ) : status === 'ARCHIVED' ? null : (
        <span className={`dot ${pulse ? 'xg-pulse' : ''}`} style={{
          background: c.dot,
          clipPath: status === 'BLOCKED' ? 'polygon(50% 0,100% 50%,50% 100%,0 50%)' : 'none',
          color: c.dot,
        }}/>
      )}
      <span>{status}</span>
    </span>
  );
}

// ─── Filter Chip ─────────────────────────────────────────────────────────
function XGChip({ label, count, active, onClick }) {
  return (
    <button className={`xg-chip ${active ? 'active' : ''}`} onClick={onClick}>
      <span>{label}</span>
      {count != null && <span className="count">{String(count).padStart(2, '0')}</span>}
    </button>
  );
}

// ─── Button ──────────────────────────────────────────────────────────────
function XGBtn({ variant = '', children, icon, onClick, type = 'button', style }) {
  return (
    <button type={type} className={`xg-btn ${variant}`} onClick={onClick} style={style}>
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

// ─── Tech Tag ────────────────────────────────────────────────────────────
function XGTechTag({ children }) {
  return (
    <span style={{
      fontFamily: 'var(--font-space-mono)', fontSize: 10, letterSpacing: '.08em',
      color: 'var(--color-ice-blue)', padding: '2px 7px',
      border: '1px solid var(--color-phantom-grey)', background: 'rgba(12,31,63,.6)',
      borderRadius: 2,
    }}>{children}</span>
  );
}

// ─── Command Strip ───────────────────────────────────────────────────────
function XGCommandStrip({ activeFilterSummary = 'ALL · 8 PROJECTS', syncTime = '14:32:07', missionCount = 9, sub = 'PUBLIC GRID', actions }) {
  return (
    <div className="xg-strip">
      <div className="xg-strip-id">
        <div className="glyph"><XGLogo size={28}/></div>
        <div className="lockup" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
          <div className="name">XENON GRID <span style={{ color: 'var(--color-cyber-blue)' }}>/</span> JCHN-01</div>
          <div className="ver">{sub} · NODE.JCHN.PERSONAL</div>
        </div>
      </div>
      <div className="xg-strip-meta">
        <div className="xg-meta-block">
          <div className="k">Last Sync</div>
          <div className="v xg-flicker">SYNC {syncTime}</div>
        </div>
        <div className="xg-meta-block">
          <div className="k">Missions</div>
          <div className="v live">{String(missionCount).padStart(2,'0')} ACTIVE</div>
        </div>
        <div className="xg-meta-block">
          <div className="k">Filter</div>
          <div className="v">{activeFilterSummary}</div>
        </div>
        <div className="xg-meta-block">
          <div className="k">Uplink</div>
          <div className="v live">◉ STABLE</div>
        </div>
      </div>
      <div className="xg-strip-actions">
        {actions || (
          <>
            <XGBtn icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 1 0 2.1-9.4L1 10"/></svg>}>Force Sync</XGBtn>
            <XGBtn variant="primary">Open Admin</XGBtn>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Quantum Readout ─────────────────────────────────────────────────────
function XGQuantumReadout({ value, label, color = 'cyan', size = 'md' }) {
  const colorMap = {
    cyan:  { num: 'var(--color-neon-cyan)',   glow: 'var(--glow-cyan)'  },
    green: { num: 'var(--color-bio-green)',   glow: 'var(--glow-green)' },
    red:   { num: 'var(--color-alert-red)',   glow: 'var(--glow-red)'   },
    purple:{ num: 'var(--color-hologram-violet)', glow: 'var(--glow-purple)' },
  };
  const c = colorMap[color];
  const numSize = size === 'lg' ? 64 : size === 'sm' ? 36 : 48;
  return (
    <div className="xg-panel" style={{ padding: '14px 16px', borderColor: 'rgba(0,180,216,.4)' }}>
      <div className="xg-corner-tl"/><div className="xg-corner-br"/>
      <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, letterSpacing: '.22em', color: 'var(--color-signal-dim)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-doto)', fontWeight: 900, fontSize: numSize, lineHeight: 1, color: c.num, textShadow: c.glow, marginTop: 4 }}>
        {String(value).padStart(2, '0')}
      </div>
    </div>
  );
}

// ─── Mission Card ────────────────────────────────────────────────────────
function XGMissionCard({ project, onClick, compact = false }) {
  const c = STATUS_COLOR[project.status];
  return (
    <div className={`xg-card ${project.isFeatured ? 'featured' : ''}`}
      style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer', minHeight: compact ? 0 : 220 }}
      onClick={onClick}>
      {/* Top row: name + status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.18em' }}>
              {project.id.toUpperCase()} · {project.category}
            </span>
            {project.isFeatured && (
              <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-hologram-violet)', letterSpacing: '.2em' }}>★ PRIORITY</span>
            )}
          </div>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 15, color: 'var(--color-star-white)', letterSpacing: '.06em', lineHeight: 1.2 }}>
            {project.name}
          </div>
        </div>
        <XGStatus status={project.status}/>
      </div>

      {/* Slug + deploy target */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--color-signal-dim)' }}>{'>'}</span> {project.githubUrl}
        </div>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: project.demoUrl ? 'var(--color-bio-green)' : 'var(--color-signal-dim)' }}>
          {project.demoUrl ? `◉ ${project.demoUrl}` : '○ LOCAL ONLY'}
        </div>
      </div>

      {/* Summary */}
      <div style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 400, fontSize: 13, color: 'var(--color-star-white)', lineHeight: 1.45, opacity: .88 }}>
        {project.summary}
      </div>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {project.techStack.slice(0, 4).map((t) => <XGTechTag key={t}>{t}</XGTechTag>)}
        {project.techStack.length > 4 && <XGTechTag>+{project.techStack.length - 4}</XGTechTag>}
      </div>

      {/* Footer: next action + meta */}
      <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px dashed var(--color-stellar-border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.2em' }}>NEXT ACTION</div>
          <div style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: 12, color: c.fg, lineHeight: 1.25 }}>
            {project.nextAction}
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.12em', textAlign: 'right' }}>
          UPDATED<br/>{project.lastUpdatedAt}
        </div>
      </div>
    </div>
  );
}

// ─── Telemetry Log ───────────────────────────────────────────────────────
function XGTelemetryLog({ entries = TELEMETRY, height = 'auto' }) {
  const kindColor = { ok: 'var(--color-bio-green)', err: 'var(--color-alert-red)', warn: 'var(--color-plasma-orange)', info: 'var(--color-ice-blue)' };
  return (
    <div className="xg-panel" style={{ position: 'relative' }}>
      <div className="xg-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="xg-pulse" style={{ width: 6, height: 6, background: 'var(--color-bio-green)', display: 'inline-block', color: 'var(--color-bio-green)' }}/>
          <div className="xg-panel-title">TELEMETRY LOG</div>
        </div>
        <div className="xg-panel-sub">LIVE · /var/log/grid</div>
      </div>
      <div style={{ padding: '8px 0', position: 'relative', height, overflow: 'hidden' }}>
        <div className="xg-scanlines"/>
        {entries.map((e, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 110px 1fr', gap: 12, padding: '4px 16px',
            fontFamily: 'var(--font-space-mono)', fontSize: 11, lineHeight: 1.4,
            borderLeft: `2px solid ${kindColor[e.kind]}`, marginLeft: 8 }}>
            <span style={{ color: 'var(--color-signal-dim)' }}>{e.time}</span>
            <span style={{ color: kindColor[e.kind], fontWeight: 700 }}>{e.code}</span>
            <span style={{ color: 'var(--color-ice-blue)' }}>{e.target}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────
function XGTimeline({ entries = TIMELINE }) {
  return (
    <div className="xg-panel">
      <div className="xg-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--color-cyber-blue)', fontFamily: 'var(--font-space-mono)', fontWeight: 700 }}>◄►</span>
          <div className="xg-panel-title">CHRONOLOGY · MISSION RAIL</div>
        </div>
        <div className="xg-panel-sub">T-MINUS · 30D WINDOW</div>
      </div>
      <div style={{ padding: '16px 20px', position: 'relative' }}>
        {/* The rail */}
        <div style={{ position: 'absolute', left: 24, right: 24, top: '50%', height: 1,
          background: 'linear-gradient(90deg, transparent, var(--color-stellar-border) 8%, var(--color-stellar-border) 92%, transparent)' }}/>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${entries.length}, 1fr)`, gap: 0, position: 'relative' }}>
          {entries.map((e, i) => {
            const c = STATUS_COLOR[e.status];
            const isUp = i % 2 === 0;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative', minWidth: 0 }}>
                {isUp && (
                  <div style={{ textAlign: 'center', marginBottom: 6 }}>
                    <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.1em' }}>{e.date}</div>
                    <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 600, fontSize: 10, color: 'var(--color-star-white)', letterSpacing: '.08em', marginTop: 2 }}>{e.project}</div>
                    <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 10, color: 'var(--color-ice-blue)', marginTop: 2, opacity: .8 }}>{e.event}</div>
                  </div>
                )}
                {/* Marker */}
                <div style={{
                  width: 14, height: 14, transform: 'rotate(45deg)',
                  background: c.dot, boxShadow: c.glow !== 'none' ? c.glow : 'none',
                  border: '1px solid var(--color-void-black)',
                }}/>
                {!isUp && (
                  <div style={{ textAlign: 'center', marginTop: 6 }}>
                    <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 600, fontSize: 10, color: 'var(--color-star-white)', letterSpacing: '.08em' }}>{e.project}</div>
                    <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 10, color: 'var(--color-ice-blue)', marginTop: 2, opacity: .8 }}>{e.event}</div>
                    <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.1em', marginTop: 2 }}>{e.date}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  XGLogo, XGStatus, XGChip, XGBtn, XGTechTag, XGCommandStrip,
  XGQuantumReadout, XGMissionCard, XGTelemetryLog, XGTimeline,
});
