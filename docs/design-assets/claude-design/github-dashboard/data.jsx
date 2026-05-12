// Mock project data for Jacky's project grid.
// Realistic mix of statuses/categories so every screen has texture.

const PROJECTS = [
  {
    id: 'p01', name: 'KAOHSIUNG TRAVEL WEB', slug: 'kaohsiung-travel-web',
    summary: 'Interactive guide to Kaohsiung neighborhoods, food districts, and night markets.',
    description: 'A Next.js-rendered itinerary planner with offline map tiles, Mandarin/English toggle, and editable day-by-day routes. Built as a personal travel tool, opened to the public after positive feedback from friends.',
    status: 'LIVE', category: 'WEB APP',
    githubUrl: 'github.com/jchen/kaohsiung-travel',
    demoUrl: 'kaohsiung.jacky.dev',
    techStack: ['Next.js', 'MapLibre', 'Postgres', 'Vercel'],
    isPublic: true, isFeatured: true, sortOrder: 1,
    lastUpdatedAt: '2026-05-10', nextAction: 'Add Tainan day-trip module',
    history: [
      { date: '2026-05-10', event: 'DEPLOY READY', note: 'v2.3.1 → prod' },
      { date: '2026-04-28', event: 'BUILD PASS', note: 'offline tile caching landed' },
      { date: '2026-04-12', event: 'UPDATED', note: 'Mandarin localization complete' },
    ],
  },
  {
    id: 'p02', name: 'STRIPE DASHBOARD', slug: 'stripe-dashboard',
    summary: 'Customer-facing analytics overlay for Stripe accounts — MRR, churn, cohort retention.',
    description: 'A self-hosted dashboard that ingests Stripe webhooks and renders MRR, churn cohorts, and trial conversion funnels. Currently rebuilding the cohort query to handle proration correctly.',
    status: 'BUILDING', category: 'WEB APP',
    githubUrl: 'github.com/jchen/stripe-dashboard',
    demoUrl: 'stripe-dash.jacky.dev',
    techStack: ['SvelteKit', 'DuckDB', 'Stripe API', 'Fly.io'],
    isPublic: true, isFeatured: true, sortOrder: 2,
    lastUpdatedAt: '2026-05-11', nextAction: 'Fix proration in cohort query',
    history: [
      { date: '2026-05-11', event: 'BUILD PASS', note: 'cohort schema migration applied' },
      { date: '2026-05-09', event: 'BUILD FAIL', note: 'TS strict-null on Stripe.Customer' },
      { date: '2026-05-04', event: 'UPDATED', note: 'switched to DuckDB from sqlite' },
    ],
  },
  {
    id: 'p03', name: 'AUTH SERVICE', slug: 'auth-service',
    summary: 'Shared auth gateway used by personal projects — OAuth, magic links, passkeys.',
    description: 'A small Go service exposing OAuth, magic-link, and WebAuthn passkey flows behind a common API. Currently blocked: a misconfigured environment is preventing passkey rollout to prod.',
    status: 'BLOCKED', category: 'API',
    githubUrl: 'github.com/jchen/auth-service',
    demoUrl: 'auth.jacky.dev',
    techStack: ['Go', 'Postgres', 'WebAuthn', 'Caddy'],
    isPublic: true, isFeatured: false, sortOrder: 3,
    lastUpdatedAt: '2026-05-08', nextAction: 'Fix ENV in prod — WEBAUTHN_RPID missing',
    history: [
      { date: '2026-05-08', event: 'SIGNAL LOST', note: 'prod auth.jacky.dev 502' },
      { date: '2026-05-08', event: 'ANOMALY', note: 'ENV MISSING — WEBAUTHN_RPID' },
      { date: '2026-05-02', event: 'DEPLOY READY', note: 'v0.4.0 staged' },
    ],
  },
  {
    id: 'p04', name: 'CRM DEMO', slug: 'crm-demo',
    summary: 'Stripped-down CRM concept demo — pipeline, deal cards, activity log.',
    description: 'Built as an interview take-home and kept as a sandbox for new UI ideas. Currently being reviewed for portfolio inclusion.',
    status: 'REVIEW', category: 'WEB APP',
    githubUrl: 'github.com/jchen/crm-demo',
    demoUrl: 'crm.jacky.dev',
    techStack: ['React', 'tRPC', 'Prisma', 'Railway'],
    isPublic: true, isFeatured: false, sortOrder: 4,
    lastUpdatedAt: '2026-05-06', nextAction: 'Decide: ship or archive after review',
    history: [
      { date: '2026-05-06', event: 'DEPLOY READY', note: 'staged for review' },
      { date: '2026-04-30', event: 'UPDATED', note: 'replaced activity log component' },
    ],
  },
  {
    id: 'p05', name: 'DEPLOY-WATCH', slug: 'deploy-watch',
    summary: 'CLI tool that tails CI/CD logs across Vercel, Fly.io, Railway from one terminal.',
    description: 'A small Go CLI that opens long-poll connections to each platform\'s deployment API and streams events into a unified TUI. Personal use only — public for reference.',
    status: 'LIVE', category: 'TOOL',
    githubUrl: 'github.com/jchen/deploy-watch',
    demoUrl: null,
    techStack: ['Go', 'Bubbletea', 'GitHub Actions API'],
    isPublic: true, isFeatured: false, sortOrder: 5,
    lastUpdatedAt: '2026-05-03', nextAction: 'Add Render.com adapter',
    history: [
      { date: '2026-05-03', event: 'BUILD PASS', note: 'v1.2.0 release' },
      { date: '2026-04-19', event: 'UPDATED', note: 'docs refresh' },
    ],
  },
  {
    id: 'p06', name: 'PIXEL SCANNER', slug: 'pixel-scanner',
    summary: 'Experimental image diff tool for pixel-perfect frontend review.',
    description: 'Captures DOM snapshots, diffs them pixel-by-pixel, and surfaces drift in PR comments. Experiment — currently stale while exploring perceptual diff algorithms.',
    status: 'STALE', category: 'EXPERIMENT',
    githubUrl: 'github.com/jchen/pixel-scanner',
    demoUrl: null,
    techStack: ['Rust', 'WASM', 'Playwright'],
    isPublic: true, isFeatured: false, sortOrder: 6,
    lastUpdatedAt: '2026-02-14', nextAction: 'Revisit perceptual diff approach',
    history: [
      { date: '2026-02-14', event: 'UPDATED', note: 'wasm build size optimization' },
      { date: '2026-01-22', event: 'BUILD PASS', note: 'initial diff engine' },
    ],
  },
  {
    id: 'p07', name: 'XENON GRID', slug: 'xenon-grid',
    summary: 'The design system powering this dashboard — tokens, components, sci-fi grid motif.',
    description: 'A self-contained design system used across personal projects. Provides color tokens, typography, clip-path corner utilities, glow effects, and a component reference doc.',
    status: 'LIVE', category: 'DESIGN SYSTEM',
    githubUrl: 'github.com/jchen/xenon-grid',
    demoUrl: 'xenon.jacky.dev',
    techStack: ['CSS', 'Storybook', 'Figma'],
    isPublic: true, isFeatured: false, sortOrder: 7,
    lastUpdatedAt: '2026-05-09', nextAction: 'Document anomaly gradient usage',
    history: [
      { date: '2026-05-09', event: 'UPDATED', note: 'added clip-path tokens' },
      { date: '2026-04-22', event: 'DEPLOY READY', note: 'docs v1.4 live' },
    ],
  },
  {
    id: 'p08', name: 'BACKUP RELAY', slug: 'backup-relay',
    summary: 'Cron-driven backup orchestrator for personal Postgres instances.',
    description: 'Schedules pg_dump → restic → B2 backup pipelines. Has been running unattended for months. Public for reference.',
    status: 'LIVE', category: 'AUTOMATION',
    githubUrl: 'github.com/jchen/backup-relay',
    demoUrl: null,
    techStack: ['Bash', 'restic', 'systemd', 'Backblaze B2'],
    isPublic: true, isFeatured: false, sortOrder: 8,
    lastUpdatedAt: '2026-04-30', nextAction: 'Add per-DB retention policy flags',
    history: [
      { date: '2026-04-30', event: 'BUILD PASS', note: 'v0.9.1 cron tweak' },
      { date: '2026-03-15', event: 'UPDATED', note: 'restic 0.17 upgrade' },
    ],
  },
  {
    id: 'p09', name: 'INKWELL', slug: 'inkwell',
    summary: 'Markdown-first journaling tool, archived after switching to Obsidian.',
    description: 'A personal journaling app. Archived after migrating to Obsidian — kept public as reference for the editor implementation.',
    status: 'ARCHIVED', category: 'TOOL',
    githubUrl: 'github.com/jchen/inkwell',
    demoUrl: null,
    techStack: ['Electron', 'TipTap', 'SQLite'],
    isPublic: true, isFeatured: false, sortOrder: 9,
    lastUpdatedAt: '2025-11-04', nextAction: '—',
    history: [
      { date: '2025-11-04', event: 'ARCHIVED', note: 'project closed' },
    ],
  },
];

const TELEMETRY = [
  { time: '14:32:07', code: 'BUILD PASS',    target: 'kaohsiung-travel-web', kind: 'ok' },
  { time: '14:18:44', code: 'DEPLOY READY',  target: 'stripe-dashboard',     kind: 'ok' },
  { time: '13:47:01', code: 'SIGNAL LOST',   target: 'auth-service',          kind: 'err' },
  { time: '13:47:00', code: 'ANOMALY',       target: 'auth-service ENV MISSING', kind: 'err' },
  { time: '12:11:22', code: 'UPDATED',       target: 'xenon-grid',            kind: 'info' },
  { time: '11:03:18', code: 'BUILD PASS',    target: 'backup-relay',          kind: 'ok' },
  { time: '09:22:18', code: 'LOCAL ONLY',    target: 'pixel-scanner',         kind: 'warn' },
  { time: '08:45:50', code: 'DEPLOY READY',  target: 'crm-demo',              kind: 'ok' },
  { time: '07:12:09', code: 'BUILD FAIL',    target: 'stripe-dashboard',      kind: 'err' },
  { time: '06:58:00', code: 'UPDATED',       target: 'deploy-watch',          kind: 'info' },
];

const TIMELINE = [
  { date: '2026-05-11', project: 'STRIPE DASHBOARD',   event: 'cohort schema migration',    status: 'BUILDING' },
  { date: '2026-05-10', project: 'KAOHSIUNG TRAVEL',   event: 'v2.3.1 → prod',              status: 'LIVE' },
  { date: '2026-05-09', project: 'XENON GRID',         event: 'clip-path tokens added',     status: 'LIVE' },
  { date: '2026-05-08', project: 'AUTH SERVICE',       event: 'prod 502 — env missing',     status: 'BLOCKED' },
  { date: '2026-05-06', project: 'CRM DEMO',           event: 'staged for review',          status: 'REVIEW' },
  { date: '2026-05-03', project: 'DEPLOY-WATCH',       event: 'v1.2.0 release',             status: 'LIVE' },
  { date: '2026-04-30', project: 'BACKUP RELAY',       event: 'v0.9.1 cron tweak',          status: 'LIVE' },
  { date: '2026-04-22', project: 'XENON GRID',         event: 'docs v1.4',                  status: 'LIVE' },
  { date: '2026-02-14', project: 'PIXEL SCANNER',      event: 'wasm size opt',              status: 'STALE' },
];

const STATUS_FILTERS = ['ALL', 'LIVE', 'BUILDING', 'REVIEW', 'BLOCKED', 'STALE', 'ARCHIVED'];
const CATEGORY_FILTERS = ['ALL', 'WEB APP', 'API', 'TOOL', 'EXPERIMENT', 'AUTOMATION', 'DESIGN SYSTEM'];

const STATUS_COLOR = {
  LIVE:     { fg: 'var(--color-star-white)',  dot: 'var(--color-bio-green)',        glow: 'var(--glow-green)' },
  BUILDING: { fg: 'var(--color-cyber-blue)',  dot: 'var(--color-cyber-blue)',       glow: 'var(--glow-blue)'  },
  REVIEW:   { fg: 'var(--color-ice-blue)',    dot: 'var(--color-hologram-violet)',  glow: 'var(--glow-purple)'},
  BLOCKED:  { fg: 'var(--color-alert-red)',   dot: 'var(--color-alert-red)',        glow: 'var(--glow-red)'   },
  STALE:    { fg: 'var(--color-signal-dim)',  dot: 'var(--color-phantom-grey)',     glow: 'none'              },
  ARCHIVED: { fg: 'var(--color-phantom-grey)',dot: 'transparent',                   glow: 'none'              },
};

Object.assign(window, { PROJECTS, TELEMETRY, TIMELINE, STATUS_FILTERS, CATEGORY_FILTERS, STATUS_COLOR });
