// Mobile screens — designed at 390x844 for an iPhone-class viewport.
// Two artboards: MobileDashboard and MobileAdminEditor.

function MobileFrame({ children, hideStatus }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--color-void-black)',
      color: 'var(--color-star-white)',
      fontFamily: 'var(--font-rajdhani)',
      overflow: 'hidden',
      position: 'relative',
      backgroundImage: 'linear-gradient(rgba(0,180,216,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,.04) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      display: 'flex', flexDirection: 'column',
    }}>
      {!hideStatus && (
        <div style={{
          padding: '14px 18px 8px', display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-space-mono)', fontSize: 12, color: 'var(--color-star-white)',
        }}>
          <span>9:41</span>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: 'var(--color-bio-green)' }}>◉</span>
            <span style={{ fontSize: 10 }}>SYNC</span>
            <span style={{ fontSize: 11 }}>5G ▮▮▮</span>
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

// ── Mobile Public Dashboard ────────────────────────────────────────────
function MobileDashboard() {
  return (
    <MobileFrame>
      {/* Mobile command strip */}
      <div style={{ padding: '6px 14px 10px', borderBottom: '1px solid var(--color-cyber-blue)', background: 'var(--color-void-black)', boxShadow: '0 0 16px rgba(0,180,216,.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--color-neon-cyan)' }}><XGLogo size={22}/></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: 12, letterSpacing: '.18em', color: 'var(--color-star-white)' }}>XENON GRID</div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.12em' }}>PUBLIC · NODE.JCHN</div>
          </div>
          <button style={{ width: 32, height: 32, background: 'transparent', border: '1px solid var(--color-stellar-border)', color: 'var(--color-ice-blue)', clipPath: 'var(--clip-button)' }}>⌕</button>
          <button style={{ width: 32, height: 32, background: 'transparent', border: '1px solid var(--color-stellar-border)', color: 'var(--color-ice-blue)', clipPath: 'var(--clip-button)' }}>≡</button>
        </div>
        {/* Meta row */}
        <div style={{ display: 'flex', gap: 12, marginTop: 8, fontFamily: 'var(--font-space-mono)', fontSize: 10 }}>
          <span style={{ color: 'var(--color-signal-dim)' }}>SYNC <span style={{ color: 'var(--color-bio-green)' }} className="xg-flicker">14:32:07</span></span>
          <span style={{ color: 'var(--color-signal-dim)' }}>·</span>
          <span style={{ color: 'var(--color-ice-blue)' }}>09 NODES</span>
          <span style={{ color: 'var(--color-signal-dim)' }}>·</span>
          <span style={{ color: 'var(--color-alert-red)' }}>1 BLOCKED</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflow: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Readouts strip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          <XGQuantumReadout value={5} label="LIVE" color="green" size="sm"/>
          <XGQuantumReadout value={1} label="FAIL" color="red" size="sm"/>
          <XGQuantumReadout value={1} label="BUILD" color="cyan" size="sm"/>
        </div>

        {/* Horizontal filter chips */}
        <div style={{ display: 'flex', gap: 6, overflow: 'auto', paddingBottom: 4, margin: '0 -12px', padding: '0 12px' }}>
          {STATUS_FILTERS.map((f, i) => <XGChip key={f} label={f} active={i === 0}/>)}
        </div>

        {/* Featured */}
        <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 10, letterSpacing: '.22em', color: 'var(--color-signal-dim)', marginTop: 4 }}>// MISSION GRID · 09</div>

        {/* Cards, single col */}
        <XGMissionCard project={PROJECTS[0]}/>
        <XGMissionCard project={PROJECTS[1]}/>
        <XGMissionCard project={PROJECTS[2]}/>

        {/* Collapsible telemetry preview */}
        <div className="xg-panel" style={{ marginTop: 4 }}>
          <div className="xg-panel-header">
            <div className="xg-panel-title">⌁ TELEMETRY</div>
            <div className="xg-panel-sub">▾ 4 events</div>
          </div>
          <div style={{ padding: '8px 0' }}>
            {TELEMETRY.slice(0,4).map((e,i)=>{
              const kc={ok:'var(--color-bio-green)',err:'var(--color-alert-red)',warn:'var(--color-plasma-orange)',info:'var(--color-ice-blue)'};
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '54px 1fr', gap: 8, padding: '4px 14px', fontFamily: 'var(--font-space-mono)', fontSize: 10 }}>
                  <span style={{ color: 'var(--color-signal-dim)' }}>{e.time}</span>
                  <span><span style={{ color: kc[e.kind], fontWeight: 700 }}>{e.code}</span> <span style={{ color: 'var(--color-ice-blue)' }}>{e.target}</span></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom safe area */}
      <div style={{ height: 8 }}/>
    </MobileFrame>
  );
}

// ── Mobile Admin Editor ────────────────────────────────────────────────
function MobileAdminEditor() {
  const project = PROJECTS.find(p => p.id === 'p02');
  return (
    <MobileFrame>
      {/* Mobile admin top bar */}
      <div style={{ padding: '6px 14px 10px', borderBottom: '1px solid var(--color-plasma-purple)', background: 'var(--color-void-black)', boxShadow: '0 0 16px rgba(124,58,237,.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{ width: 32, height: 32, background: 'transparent', border: '1px solid var(--color-stellar-border)', color: 'var(--color-ice-blue)', clipPath: 'var(--clip-button)', fontFamily: 'var(--font-space-mono)' }}>‹</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-hologram-violet)', letterSpacing: '.16em' }}>ADMIN / EDIT</div>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 12, letterSpacing: '.1em', color: 'var(--color-star-white)' }}>{project.name}</div>
          </div>
          <span className="xg-pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-plasma-orange)', letterSpacing: '.16em' }}>
            <span style={{ width: 5, height: 5, background: 'var(--color-plasma-orange)', color: 'var(--color-plasma-orange)' }}/>UNSAVED
          </span>
        </div>
      </div>

      {/* Sticky tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-stellar-border)', background: 'rgba(7,17,34,.5)' }}>
        {['BASICS','LINKS','CLASS','VISIBLE'].map((t,i) => (
          <button key={t} style={{
            flex: 1, padding: '10px 4px', background: 'transparent', cursor: 'pointer',
            border: 'none', borderBottom: `2px solid ${i===0 ? 'var(--color-cyber-blue)' : 'transparent'}`,
            color: i===0 ? 'var(--color-star-white)' : 'var(--color-ice-blue)',
            fontFamily: 'var(--font-orbitron)', fontWeight: 600, fontSize: 10, letterSpacing: '.16em',
            boxShadow: i===0 ? '0 1px 0 var(--color-cyber-blue), 0 0 12px rgba(0,245,255,.4)' : 'none',
          }}>{t}</button>
        ))}
      </div>

      {/* Form body */}
      <div style={{ flex: 1, overflow: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="xg-field">
          <label className="xg-label">Mission Name *</label>
          <input className="xg-input" defaultValue={project.name}/>
        </div>
        <div className="xg-field">
          <label className="xg-label">Slug *</label>
          <input className="xg-input" defaultValue={project.slug}/>
        </div>
        <div className="xg-field">
          <label className="xg-label">Summary</label>
          <textarea className="xg-input" rows={3} defaultValue={project.summary}/>
          <div className="xg-help">{project.summary.length} / 240 chars</div>
        </div>
        <div className="xg-field">
          <label className="xg-label">Status</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['BUILDING','LIVE','BLOCKED','REVIEW'].map(s => <XGChip key={s} label={s} active={s==='BUILDING'}/>)}
          </div>
        </div>
        <div className="xg-field">
          <label className="xg-label">Next Action</label>
          <input className="xg-input" defaultValue={project.nextAction}/>
        </div>

        {/* Toggles */}
        <div className="xg-panel" style={{ padding: 12 }}>
          <ToggleRow label="Public" enabled={true} desc="Visible on mission grid."/>
          <div style={{ height: 10 }}/>
          <ToggleRow label="Featured" enabled={true} desc="Pinned to top."/>
        </div>
      </div>

      {/* Sticky footer */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--color-stellar-border)', background: 'var(--color-deep-space)', display: 'flex', gap: 8 }}>
        <XGBtn style={{ flex: 1, justifyContent: 'center' }}>DISCARD</XGBtn>
        <XGBtn variant="solid-cyan" style={{ flex: 2, justifyContent: 'center' }}>SAVE CHANGES ▸</XGBtn>
      </div>
    </MobileFrame>
  );
}

// ── Mobile detail drawer ───────────────────────────────────────────────
function MobileDetail() {
  const project = PROJECTS[1];
  return (
    <MobileFrame>
      <div style={{ padding: '6px 14px 10px', borderBottom: '1px solid var(--color-cyber-blue)', background: 'var(--color-void-black)', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 0 16px rgba(0,180,216,.2)' }}>
        <button style={{ width: 32, height: 32, background: 'transparent', border: '1px solid var(--color-stellar-border)', color: 'var(--color-ice-blue)', clipPath: 'var(--clip-button)', fontFamily: 'var(--font-space-mono)' }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.16em' }}>SCANNER · {project.id.toUpperCase()}</div>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 13, letterSpacing: '.08em', color: 'var(--color-star-white)' }}>{project.name}</div>
        </div>
        <XGStatus status={project.status}/>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 13, color: 'var(--color-star-white)', margin: 0, lineHeight: 1.5, opacity: .92 }}>{project.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.techStack.map(t => <XGTechTag key={t}>{t}</XGTechTag>)}
        </div>

        <div className="xg-panel" style={{ padding: 12 }}>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.2em', marginBottom: 6 }}>// SIGNAL HISTORY</div>
          {project.history.map((h,i)=>(
            <div key={i} style={{ padding: '6px 0', borderBottom: i < project.history.length - 1 ? '1px dashed var(--color-stellar-border)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-cyber-blue)', fontWeight: 700, letterSpacing: '.12em' }}>{h.event}</span>
                <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)' }}>{h.date}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 12, color: 'var(--color-ice-blue)', marginTop: 2 }}>{h.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--color-stellar-border)', background: 'var(--color-deep-space)', display: 'flex', gap: 8 }}>
        <XGBtn style={{ flex: 1, justifyContent: 'center' }}>REPO ↗</XGBtn>
        <XGBtn variant="primary" style={{ flex: 1, justifyContent: 'center' }}>DEMO ▸</XGBtn>
      </div>
    </MobileFrame>
  );
}

Object.assign(window, { MobileFrame, MobileDashboard, MobileAdminEditor, MobileDetail });
