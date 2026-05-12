// Admin screens: Login, Overview, Editor, Delete Confirm.

// ── Admin chrome (left nav + top bar) ─────────────────────────────────
function AdminShell({ activeNav = 'PROJECTS', user = 'jacky@jchn.dev', children, breadcrumbs }) {
  const navItems = [
    { id: 'OVERVIEW',  label: 'OVERVIEW',  icon: '◰' },
    { id: 'PROJECTS',  label: 'PROJECTS',  icon: '⬢' },
    { id: 'ACCOUNTS',  label: 'ACCOUNTS',  icon: '◈' },
    { id: 'TELEMETRY', label: 'TELEMETRY', icon: '⌁' },
    { id: 'AUDIT',     label: 'AUDIT LOG', icon: '∇' },
  ];
  return (
    <div className="xg-canvas">
      {/* Admin top bar */}
      <div className="xg-strip" style={{ borderBottomColor: 'var(--color-plasma-purple)', boxShadow: 'inset 0 -1px 0 rgba(168,85,247,.25), 0 0 24px rgba(124,58,237,.18)' }}>
        <div className="xg-strip-id">
          <div className="glyph" style={{ color: 'var(--color-hologram-violet)' }}><XGLogo size={28}/></div>
          <div className="lockup" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
            <div className="name">XENON GRID <span style={{ color: 'var(--color-hologram-violet)' }}>/</span> ADMIN</div>
            <div className="ver">RESTRICTED · NODE.JCHN.PERSONAL</div>
          </div>
        </div>
        <div className="xg-strip-meta">
          {breadcrumbs && (
            <div className="xg-meta-block">
              <div className="k">Location</div>
              <div className="v" style={{ color: 'var(--color-star-white)' }}>{breadcrumbs}</div>
            </div>
          )}
          <div className="xg-meta-block">
            <div className="k">Operator</div>
            <div className="v">{user}</div>
          </div>
          <div className="xg-meta-block">
            <div className="k">Session</div>
            <div className="v live">◉ AUTHENTICATED · 24m</div>
          </div>
        </div>
        <div className="xg-strip-actions">
          <XGBtn>VIEW PUBLIC GRID ↗</XGBtn>
          <XGBtn icon={<span>⏻</span>}>SIGN OFF</XGBtn>
        </div>
      </div>

      {/* Body: nav + content */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 'calc(100% - 70px)' }}>
        <nav style={{ background: 'rgba(7,17,34,.5)', borderRight: '1px solid var(--color-stellar-border)', padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 10, letterSpacing: '.24em', color: 'var(--color-signal-dim)', padding: '4px 10px', marginBottom: 4 }}>// CONSOLE</div>
          {navItems.map(n => {
            const active = n.id === activeNav;
            return (
              <button key={n.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', cursor: 'pointer',
                background: active ? 'rgba(124,58,237,.16)' : 'transparent',
                border: `1px solid ${active ? 'var(--color-plasma-purple)' : 'transparent'}`,
                clipPath: 'var(--clip-button)', color: active ? 'var(--color-star-white)' : 'var(--color-ice-blue)',
                fontFamily: 'var(--font-orbitron)', fontWeight: 600, fontSize: 11, letterSpacing: '.18em',
                boxShadow: active ? 'var(--glow-purple)' : 'none', textAlign: 'left',
              }}>
                <span style={{ color: active ? 'var(--color-hologram-violet)' : 'var(--color-signal-dim)', fontSize: 14 }}>{n.icon}</span>
                {n.label}
              </button>
            );
          })}
          <div style={{ marginTop: 'auto', paddingTop: 20 }}>
            <div className="xg-panel" style={{ padding: 12, borderColor: 'rgba(0,255,136,.3)' }}>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.18em' }}>SYS LOAD</div>
              <div style={{ fontFamily: 'var(--font-doto)', fontWeight: 900, fontSize: 28, color: 'var(--color-bio-green)', lineHeight: 1, marginTop: 2 }}>04<span style={{ fontSize: 14, color: 'var(--color-signal-dim)' }}>%</span></div>
              <div style={{ height: 3, background: 'var(--color-stellar-border)', marginTop: 6 }}>
                <div style={{ height: '100%', width: '4%', background: 'var(--color-bio-green)', boxShadow: 'var(--glow-green)' }}/>
              </div>
            </div>
          </div>
        </nav>

        <main style={{ padding: 20 }}>{children}</main>
      </div>
    </div>
  );
}

// ── Admin Login ────────────────────────────────────────────────────────
function AdminLogin({ state = 'default' }) {
  const isInvalid = state === 'invalid';
  const isLoading = state === 'loading';
  return (
    <div className="xg-canvas" style={{ display: 'grid', placeItems: 'center' }}>
      {/* Decorative hex grid behind */}
      <div className="xg-hex" style={{ position: 'absolute', inset: 0, opacity: .35 }}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', width: 900, gap: 0, position: 'relative', zIndex: 1 }}>

        {/* Identity panel */}
        <div className="xg-panel" style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--gradient-singularity)', minHeight: 540, position: 'relative', overflow: 'hidden' }}>
          <div className="xg-scanlines"/>
          <div style={{ position: 'absolute', top: -40, right: -40, opacity: .15 }}>
            <svg width="320" height="320" viewBox="0 0 320 320">
              {Array.from({length: 18}).map((_, i) => (
                <polygon key={i} points="160,40 240,80 240,240 160,280 80,240 80,80" fill="none" stroke="var(--color-cyber-blue)" strokeWidth="0.5" transform={`scale(${1 - i*0.05}) translate(${i*8}, ${i*8})`} style={{ transformOrigin: '160px 160px' }}/>
              ))}
            </svg>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ color: 'var(--color-neon-cyan)' }}><XGLogo size={40}/></span>
              <div>
                <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: 18, color: 'var(--color-star-white)', letterSpacing: '.16em' }}>XENON GRID</div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-cyber-blue)', letterSpacing: '.2em' }}>v2.3.1 · ADMIN CONSOLE</div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 32, color: 'var(--color-star-white)', letterSpacing: '.04em', lineHeight: 1.1, marginBottom: 16 }}>
              OPERATOR<br/>AUTHENTICATION<br/><span style={{ color: 'var(--color-cyber-blue)' }}>REQUIRED</span>
            </div>
            <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 14, color: 'var(--color-ice-blue)', lineHeight: 1.5, maxWidth: 360 }}>
              This console manages the public project grid. Restricted to authorized operators. All actions are signed and logged to the audit rail.
            </div>
          </div>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="xg-divider">SYSTEM STATUS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)' }}>
                <div style={{ color: 'var(--color-signal-dim)', fontSize: 9, letterSpacing: '.2em' }}>UPLINK</div>
                <span style={{ color: 'var(--color-bio-green)' }}>◉ STABLE</span>
              </div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)' }}>
                <div style={{ color: 'var(--color-signal-dim)', fontSize: 9, letterSpacing: '.2em' }}>NODES</div>
                <span>09 PUBLIC</span>
              </div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)' }}>
                <div style={{ color: 'var(--color-signal-dim)', fontSize: 9, letterSpacing: '.2em' }}>FAILING</div>
                <span style={{ color: 'var(--color-alert-red)' }}>01 NODE</span>
              </div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)' }}>
                <div style={{ color: 'var(--color-signal-dim)', fontSize: 9, letterSpacing: '.2em' }}>BUILD</div>
                <span style={{ color: 'var(--color-cyber-blue)' }}>v2.3.1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="xg-panel glow" style={{ padding: '40px 36px', background: 'var(--color-deep-space)', minHeight: 540, display: 'flex', flexDirection: 'column', gap: 18, borderLeft: 'none' }}>
          <div className="xg-corner-tl"/><div className="xg-corner-tr"/><div className="xg-corner-bl"/><div className="xg-corner-br"/>
          <div>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-signal-dim)', letterSpacing: '.22em' }}>// AUTH SEQUENCE</div>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 22, color: 'var(--color-star-white)', letterSpacing: '.08em', marginTop: 6 }}>SIGN IN</div>
          </div>

          {isInvalid && (
            <div style={{ padding: '10px 14px', background: 'rgba(255,31,78,.1)', border: '1px solid var(--color-alert-red)', clipPath: 'var(--clip-button)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--color-alert-red)', fontSize: 18 }}>✕</span>
              <div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontWeight: 700, fontSize: 11, color: 'var(--color-alert-red)', letterSpacing: '.2em' }}>ERR · 0x401</div>
                <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 13, color: 'var(--color-star-white)' }}>Credentials rejected. 2 attempts remaining before lockout.</div>
              </div>
            </div>
          )}

          <div className="xg-field">
            <label className="xg-label">Operator Email</label>
            <input className={`xg-input ${isInvalid ? 'error' : ''}`} defaultValue="jacky@jchn.dev" />
          </div>
          <div className="xg-field">
            <label className="xg-label">Cipher Key</label>
            <input className={`xg-input ${isInvalid ? 'error' : ''}`} type="password" defaultValue="••••••••••••" />
            {isInvalid && <div className="xg-help error">// Cipher invalid — verify before retry.</div>}
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-rajdhani)', fontSize: 13, color: 'var(--color-ice-blue)', cursor: 'pointer' }}>
            <span style={{ width: 16, height: 16, border: '1px solid var(--color-stellar-border)', display: 'inline-grid', placeItems: 'center', background: 'var(--color-void-black)' }}>
              <span style={{ width: 8, height: 8, background: 'var(--color-cyber-blue)' }}/>
            </span>
            Remember this terminal for 30 days
          </label>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <XGBtn variant="solid-cyan" style={{ width: '100%', justifyContent: 'center', padding: '12px 16px' }}>
              {isLoading ? (
                <><span className="xg-flicker" style={{ display: 'inline-block', width: 8, height: 8, background: 'currentColor', marginRight: 6 }}/>AUTHENTICATING…</>
              ) : 'AUTHENTICATE ▸'}
            </XGBtn>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--color-ice-blue)', fontFamily: 'var(--font-rajdhani)', fontSize: 12, cursor: 'pointer', textAlign: 'center', letterSpacing: '.04em' }}>
              Forgot cipher? Request operator reset →
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-space-mono)', fontSize: 9, color: 'var(--color-signal-dim)', letterSpacing: '.18em' }}>
            <span>TLS · ED25519</span>
            <span>SESSION TTL · 30M</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Admin Overview ─────────────────────────────────────────────────────
function AdminOverview() {
  const counts = {
    LIVE: PROJECTS.filter(p => p.status === 'LIVE').length,
    BUILDING: PROJECTS.filter(p => p.status === 'BUILDING').length,
    REVIEW: PROJECTS.filter(p => p.status === 'REVIEW').length,
    BLOCKED: PROJECTS.filter(p => p.status === 'BLOCKED').length,
    STALE: PROJECTS.filter(p => p.status === 'STALE').length,
    ARCHIVED: PROJECTS.filter(p => p.status === 'ARCHIVED').length,
  };

  return (
    <AdminShell activeNav="PROJECTS" breadcrumbs="ADMIN / PROJECTS">
      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.22em' }}>// SECTOR 02 · PROJECT RECORDS</div>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: 26, color: 'var(--color-star-white)', letterSpacing: '.08em', marginTop: 4 }}>PROJECT REGISTRY</div>
          <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 13, color: 'var(--color-ice-blue)', marginTop: 4 }}>09 records · sortable · drag-handle reorderable · all changes logged</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <XGBtn>EXPORT JSON</XGBtn>
          <XGBtn variant="solid-cyan" icon={<span>＋</span>}>NEW PROJECT</XGBtn>
        </div>
      </div>

      {/* Summary readouts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'LIVE',     v: counts.LIVE,     color: 'green' },
          { label: 'BUILDING', v: counts.BUILDING, color: 'cyan'  },
          { label: 'REVIEW',   v: counts.REVIEW,   color: 'purple'},
          { label: 'BLOCKED',  v: counts.BLOCKED,  color: 'red'   },
          { label: 'STALE',    v: counts.STALE,    color: 'cyan'  },
          { label: 'ARCHIVED', v: counts.ARCHIVED, color: 'cyan'  },
        ].map(r => <XGQuantumReadout key={r.label} {...r} value={r.v} size="sm"/>)}
      </div>

      {/* Filter row */}
      <div className="xg-panel" style={{ padding: 12, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <input className="xg-input" placeholder="search by name or slug…" defaultValue="" style={{ paddingLeft: 30 }}/>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-signal-dim)', fontSize: 14 }}>⌕</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <XGChip label="ALL" count={9} active/>
          <XGChip label="LIVE" count={3}/>
          <XGChip label="BUILDING" count={1}/>
          <XGChip label="BLOCKED" count={1}/>
          <XGChip label="STALE" count={1}/>
        </div>
        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
          <XGChip label="◉ PUBLIC" active/>
          <XGChip label="★ FEATURED"/>
          <XGChip label="○ DRAFT"/>
        </div>
      </div>

      {/* Table */}
      <div className="xg-panel">
        <div style={{ display: 'grid', gridTemplateColumns: '32px 50px 1.6fr 110px 130px 70px 80px 110px 110px', gap: 12, padding: '10px 16px',
          background: 'rgba(10,42,74,.4)', borderBottom: '1px solid var(--color-stellar-border)',
          fontFamily: 'var(--font-orbitron)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.18em' }}>
          <span></span>
          <span>ORDER ↕</span>
          <span>NAME · SLUG</span>
          <span>STATUS</span>
          <span>CATEGORY</span>
          <span>PUBLIC</span>
          <span>FEATURED</span>
          <span>UPDATED ↓</span>
          <span style={{ textAlign: 'right' }}>ACTIONS</span>
        </div>
        {PROJECTS.map((p, i) => (
          <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '32px 50px 1.6fr 110px 130px 70px 80px 110px 110px', gap: 12,
            padding: '10px 16px', alignItems: 'center',
            borderBottom: '1px solid rgba(10,42,74,.5)',
            background: i % 2 === 0 ? 'rgba(7,17,34,.4)' : 'transparent',
          }}>
            <span style={{ color: 'var(--color-signal-dim)', fontSize: 14, cursor: 'grab' }}>⋮⋮</span>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-signal-dim)' }}>#{String(p.sortOrder).padStart(2,'0')}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 600, fontSize: 12, color: 'var(--color-star-white)', letterSpacing: '.06em' }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-ice-blue)', opacity: .8, marginTop: 1 }}>{p.slug}</div>
            </div>
            <XGStatus status={p.status}/>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-ice-blue)', letterSpacing: '.1em' }}>{p.category}</span>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: p.isPublic ? 'var(--color-bio-green)' : 'var(--color-signal-dim)' }}>
              {p.isPublic ? '◉ YES' : '○ NO'}
            </span>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: p.isFeatured ? 'var(--color-hologram-violet)' : 'var(--color-signal-dim)' }}>
              {p.isFeatured ? '★ YES' : '— NO'}
            </span>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-ice-blue)' }}>{p.lastUpdatedAt}</span>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
              <button style={{ padding: '4px 8px', background: 'transparent', border: '1px solid var(--color-stellar-border)', cursor: 'pointer', color: 'var(--color-ice-blue)', fontFamily: 'var(--font-orbitron)', fontSize: 9, letterSpacing: '.16em' }}>EDIT</button>
              <button style={{ padding: '4px 8px', background: 'transparent', border: '1px solid var(--color-stellar-border)', cursor: 'pointer', color: 'var(--color-signal-dim)', fontFamily: 'var(--font-orbitron)', fontSize: 9, letterSpacing: '.16em' }}>⋯</button>
            </div>
          </div>
        ))}
        {/* Footer / pagination */}
        <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-signal-dim)',
          borderTop: '1px solid var(--color-stellar-border)', background: 'rgba(7,17,34,.5)' }}>
          <span>SHOWING 09 / 09 RECORDS</span>
          <span>PAGE 01 / 01</span>
        </div>
      </div>
    </AdminShell>
  );
}

// ── Admin Project Editor ───────────────────────────────────────────────
function AdminEditor({ state = 'dirty' }) {
  const project = PROJECTS.find(p => p.id === 'p02'); // Stripe Dashboard — has rich data
  const showError = state === 'validation';
  const showSaved = state === 'saved';
  const showSaving = state === 'saving';

  return (
    <AdminShell activeNav="PROJECTS" breadcrumbs={`ADMIN / PROJECTS / ${project.slug}`}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.22em' }}>// EDITING · {project.id.toUpperCase()}</span>
            {state === 'dirty' && (
              <span className="xg-pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-plasma-orange)', letterSpacing: '.18em' }}>
                <span style={{ width: 6, height: 6, background: 'var(--color-plasma-orange)', display: 'inline-block', color: 'var(--color-plasma-orange)' }}/>UNSAVED
              </span>
            )}
            {showSaved && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-bio-green)', letterSpacing: '.18em' }}>
                <span style={{ width: 6, height: 6, background: 'var(--color-bio-green)', display: 'inline-block' }}/>SAVED · 14:33:11
              </span>
            )}
          </div>
          <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: 24, color: 'var(--color-star-white)', letterSpacing: '.06em', marginTop: 4 }}>{project.name}</div>
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 12, color: 'var(--color-ice-blue)', marginTop: 2 }}>/projects/{project.slug}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <XGBtn>← BACK</XGBtn>
          <XGBtn>PREVIEW PUBLIC</XGBtn>
          <XGBtn variant={showSaving ? '' : 'solid-cyan'}>
            {showSaving ? (<><span className="xg-flicker" style={{ display: 'inline-block', width: 6, height: 6, background: 'currentColor', marginRight: 6 }}/>SAVING…</>) : 'SAVE CHANGES ▸'}
          </XGBtn>
        </div>
      </div>

      {/* Main columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'flex-start' }}>

        {/* LEFT: form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Basic Info */}
          <div className="xg-panel">
            <div className="xg-panel-header">
              <div className="xg-panel-title">◰ BASIC INFO</div>
              <div className="xg-panel-sub">block.01</div>
            </div>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                <div className="xg-field">
                  <label className="xg-label">Mission Name *</label>
                  <input className="xg-input" defaultValue={project.name}/>
                </div>
                <div className="xg-field">
                  <label className="xg-label">Slug * <span style={{ color: 'var(--color-signal-dim)', fontFamily: 'var(--font-space-mono)', fontSize: 9 }}>(URL-safe)</span></label>
                  <input className="xg-input" defaultValue={project.slug}/>
                </div>
              </div>
              <div className="xg-field">
                <label className="xg-label">Summary <span style={{ color: 'var(--color-signal-dim)', fontFamily: 'var(--font-space-mono)', fontSize: 9 }}>· shown on grid card · required for public</span></label>
                <textarea className={`xg-input ${showError ? 'error' : ''}`} rows={2} defaultValue={showError ? '' : project.summary}/>
                {showError ? (
                  <div className="xg-help error">// REQUIRED for public projects · 0/240 chars</div>
                ) : (
                  <div className="xg-help">{project.summary.length} / 240 chars · plain text only</div>
                )}
              </div>
              <div className="xg-field">
                <label className="xg-label">Description <span style={{ color: 'var(--color-signal-dim)', fontFamily: 'var(--font-space-mono)', fontSize: 9 }}>· shown in scanner panel</span></label>
                <textarea className="xg-input" rows={5} defaultValue={project.description} style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 13 }}/>
                <div className="xg-help">supports markdown · plain text fallback</div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="xg-panel">
            <div className="xg-panel-header">
              <div className="xg-panel-title">⌁ TRANSMISSION LINKS</div>
              <div className="xg-panel-sub">block.02</div>
            </div>
            <div style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="xg-field">
                <label className="xg-label">GitHub URL</label>
                <input className="xg-input" defaultValue={`https://${project.githubUrl}`}/>
                <div className="xg-help" style={{ color: 'var(--color-bio-green)' }}>✓ valid · 200 OK</div>
              </div>
              <div className="xg-field">
                <label className="xg-label">Demo URL</label>
                <input className="xg-input" defaultValue={`https://${project.demoUrl}`}/>
                <div className="xg-help" style={{ color: 'var(--color-bio-green)' }}>✓ valid · uplink stable</div>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="xg-panel">
            <div className="xg-panel-header">
              <div className="xg-panel-title">⬢ CLASSIFICATION</div>
              <div className="xg-panel-sub">block.03</div>
            </div>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="xg-field">
                <label className="xg-label">Status</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['PLANNING','BUILDING','LIVE','PAUSED','BLOCKED','ARCHIVED'].map(s => (
                    <XGChip key={s} label={s} active={s === 'BUILDING'}/>
                  ))}
                </div>
                <div className="xg-help">PLANNING displays as <span style={{ color: 'var(--color-hologram-violet)' }}>REVIEW</span> · PAUSED as <span style={{ color: 'var(--color-signal-dim)' }}>STALE</span> on the public grid</div>
              </div>
              <div className="xg-field">
                <label className="xg-label">Category</label>
                <select className="xg-input" defaultValue={project.category}>
                  {CATEGORY_FILTERS.filter(c=>c!=='ALL').map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="xg-field">
                <label className="xg-label">Propulsion Stack <span style={{ color: 'var(--color-signal-dim)', fontFamily: 'var(--font-space-mono)', fontSize: 9 }}>· enter to add</span></label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: 8, border: '1px solid var(--color-stellar-border)', background: 'var(--color-void-black)' }}>
                  {project.techStack.map(t => (
                    <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)', padding: '4px 10px', background: 'rgba(0,180,216,.12)', border: '1px solid var(--color-cyber-blue)', clipPath: 'var(--clip-button)' }}>
                      {t}
                      <span style={{ color: 'var(--color-signal-dim)', cursor: 'pointer' }}>×</span>
                    </span>
                  ))}
                  <input style={{ flex: 1, minWidth: 100, background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-star-white)', fontFamily: 'var(--font-space-mono)', fontSize: 12, padding: 4 }} placeholder="+ add tech…"/>
                </div>
              </div>
            </div>
          </div>

          {/* Next action / History (compact) */}
          <div className="xg-panel">
            <div className="xg-panel-header">
              <div className="xg-panel-title">∇ NEXT ACTION & HISTORY</div>
              <div className="xg-panel-sub">block.04 · optional</div>
            </div>
            <div style={{ padding: 18, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
              <div className="xg-field">
                <label className="xg-label">Next Action</label>
                <input className="xg-input" defaultValue={project.nextAction}/>
                <div className="xg-help">shown at bottom of mission card · keep under one line</div>
              </div>
              <div>
                <div className="xg-label" style={{ marginBottom: 6 }}>Last Updated</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input className="xg-input" defaultValue={project.lastUpdatedAt}/>
                  <XGBtn>NOW</XGBtn>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT: operational panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 16 }}>
          {/* Save state */}
          <div className="xg-panel glow" style={{ padding: 16 }}>
            <div className="xg-corner-tl"/><div className="xg-corner-br"/>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.22em' }}>// COMMIT QUEUE</div>
            <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 14, color: 'var(--color-star-white)', letterSpacing: '.1em', marginTop: 6 }}>
              {state === 'dirty' && '3 UNSAVED CHANGES'}
              {showSaving && 'COMMITTING…'}
              {showSaved && 'ALL CHANGES SAVED'}
              {showError && 'VALIDATION FAILED'}
            </div>
            <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 12, color: 'var(--color-ice-blue)', marginTop: 4, lineHeight: 1.45 }}>
              {state === 'dirty' && 'name, status, next-action queued for commit.'}
              {showSaving && 'writing to /api/projects/p02 …'}
              {showSaved && 'snapshot persisted · public grid will reflect within 30s.'}
              {showError && '1 field needs attention before commit can proceed.'}
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <XGBtn variant="solid-cyan" style={{ justifyContent: 'center' }}>SAVE CHANGES ▸</XGBtn>
              <XGBtn style={{ justifyContent: 'center' }}>DISCARD</XGBtn>
            </div>
          </div>

          {/* Visibility */}
          <div className="xg-panel">
            <div className="xg-panel-header">
              <div className="xg-panel-title">◉ VISIBILITY</div>
            </div>
            <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <ToggleRow label="Public" enabled={true} desc="Visible on the public mission grid."/>
              <ToggleRow label="Featured" enabled={true} desc="Pinned to top with warp gradient."/>
              <div className="xg-field">
                <label className="xg-label">Sort Order</label>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input className="xg-input" defaultValue="2" style={{ width: 60, textAlign: 'center' }}/>
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-signal-dim)' }}>of 09</span>
                  <button style={{ marginLeft: 'auto', padding: '6px 8px', background: 'transparent', border: '1px solid var(--color-stellar-border)', color: 'var(--color-ice-blue)', fontFamily: 'var(--font-orbitron)', fontSize: 10, letterSpacing: '.18em', cursor: 'pointer' }}>↑ UP</button>
                  <button style={{ padding: '6px 8px', background: 'transparent', border: '1px solid var(--color-stellar-border)', color: 'var(--color-ice-blue)', fontFamily: 'var(--font-orbitron)', fontSize: 10, letterSpacing: '.18em', cursor: 'pointer' }}>↓ DOWN</button>
                </div>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div className="xg-panel" style={{ borderColor: 'rgba(255,31,78,.4)' }}>
            <div className="xg-panel-header" style={{ background: 'rgba(255,31,78,.08)' }}>
              <div className="xg-panel-title" style={{ color: 'var(--color-alert-red)' }}>⚠ DESTRUCTIVE</div>
              <div className="xg-panel-sub">requires confirm</div>
            </div>
            <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <XGBtn variant="danger" style={{ justifyContent: 'center' }}>ARCHIVE PROJECT</XGBtn>
              <XGBtn variant="danger" style={{ justifyContent: 'center' }}>DELETE PROJECT</XGBtn>
            </div>
          </div>

          {/* Meta */}
          <div className="xg-panel" style={{ padding: 14 }}>
            <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'var(--color-signal-dim)', letterSpacing: '.22em', marginBottom: 8 }}>// METADATA</div>
            {[
              ['ID', project.id.toUpperCase()],
              ['CREATED', '2025-09-14'],
              ['UPDATED', project.lastUpdatedAt],
              ['REVS', '0x1F'],
            ].map(([k,v])=>(
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontFamily: 'var(--font-space-mono)', fontSize: 11 }}>
                <span style={{ color: 'var(--color-signal-dim)', letterSpacing: '.12em' }}>{k}</span>
                <span style={{ color: 'var(--color-ice-blue)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function ToggleRow({ label, enabled, desc }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button style={{
        width: 38, height: 20, background: enabled ? 'rgba(0,180,216,.3)' : 'var(--color-nebula-navy)',
        border: `1px solid ${enabled ? 'var(--color-cyber-blue)' : 'var(--color-stellar-border)'}`,
        boxShadow: enabled ? 'var(--glow-cyan)' : 'none', position: 'relative', cursor: 'pointer',
        clipPath: 'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)',
      }}>
        <span style={{ position: 'absolute', top: 2, left: enabled ? 20 : 2, width: 14, height: 14,
          background: enabled ? 'var(--color-neon-cyan)' : 'var(--color-signal-dim)', transition: 'left .15s', boxShadow: enabled ? '0 0 8px var(--color-neon-cyan)' : 'none' }}/>
      </button>
      <div>
        <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 600, fontSize: 11, color: 'var(--color-star-white)', letterSpacing: '.14em' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 11, color: 'var(--color-ice-blue)', opacity: .8 }}>{desc}</div>
      </div>
    </div>
  );
}

// ── Delete Confirmation (overlay over Admin Overview) ──────────────────
function AdminDeleteConfirm() {
  const project = PROJECTS.find(p => p.id === 'p06'); // Pixel Scanner (stale)
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <AdminOverview/>
      {/* Modal */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(2,8,16,.78)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', zIndex: 10 }}>
        <div className="xg-hex" style={{ position: 'absolute', inset: 0, opacity: .2 }}/>
        <div className="xg-panel" style={{
          width: 540, padding: 0, position: 'relative',
          borderColor: 'var(--color-alert-red)', boxShadow: 'var(--glow-red), 0 30px 80px rgba(0,0,0,.8)',
        }}>
          <div className="xg-corner-tl"/><div className="xg-corner-tr"/><div className="xg-corner-bl"/><div className="xg-corner-br"/>
          <div className="xg-scanlines"/>

          <div style={{ background: 'var(--gradient-anomaly)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, border: '2px solid var(--color-star-white)', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)', display: 'grid', placeItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: 18, color: 'var(--color-star-white)' }}>!</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 10, color: 'rgba(255,255,255,.85)', letterSpacing: '.24em' }}>// IRREVERSIBLE OPERATION · 0xDESTRUCT</div>
              <div style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: 18, color: 'var(--color-star-white)', letterSpacing: '.12em', marginTop: 2 }}>CONFIRM PROJECT DELETION</div>
            </div>
          </div>

          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 14, color: 'var(--color-star-white)', lineHeight: 1.5 }}>
              You are about to permanently remove this project record. Public visitors will lose access immediately. This action <strong style={{ color: 'var(--color-alert-red)' }}>cannot be undone</strong>.
            </div>

            <div style={{ background: 'rgba(2,8,16,.7)', border: '1px solid var(--color-stellar-border)', padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <XGStatus status={project.status}/>
                <span style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 700, fontSize: 14, color: 'var(--color-star-white)', letterSpacing: '.06em' }}>{project.name}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: 11, color: 'var(--color-ice-blue)' }}>{project.githubUrl}</div>
              <div style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 12, color: 'var(--color-ice-blue)', opacity: .8, marginTop: 4 }}>{project.summary}</div>
            </div>

            <div className="xg-field">
              <label className="xg-label">Type project slug to confirm</label>
              <input className="xg-input" defaultValue="pixel-scanner" style={{ borderColor: 'var(--color-alert-red)' }}/>
              <div className="xg-help" style={{ color: 'var(--color-bio-green)' }}>✓ slug matches · ready to proceed</div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-rajdhani)', fontSize: 12, color: 'var(--color-ice-blue)' }}>
              <span style={{ width: 14, height: 14, border: '1px solid var(--color-alert-red)', display: 'inline-grid', placeItems: 'center', background: 'var(--color-void-black)' }}>
                <span style={{ width: 8, height: 8, background: 'var(--color-alert-red)' }}/>
              </span>
              I understand this action is irreversible. Audit log will record this deletion.
            </label>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <XGBtn>CANCEL</XGBtn>
              <XGBtn variant="solid-danger">CONFIRM · DELETE</XGBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  AdminShell, AdminLogin, AdminOverview, AdminEditor, AdminDeleteConfirm, ToggleRow,
});
