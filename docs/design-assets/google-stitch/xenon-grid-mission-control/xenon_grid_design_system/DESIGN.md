---
name: Xenon Grid Design System
colors:
  surface: '#0e1416'
  surface-dim: '#0e1416'
  surface-bright: '#343a3c'
  surface-container-lowest: '#090f11'
  surface-container-low: '#171c1f'
  surface-container: '#1b2023'
  surface-container-high: '#252b2d'
  surface-container-highest: '#303638'
  on-surface: '#dee3e6'
  on-surface-variant: '#bcc9ce'
  inverse-surface: '#dee3e6'
  inverse-on-surface: '#2b3134'
  outline: '#869398'
  outline-variant: '#3d494d'
  surface-tint: '#4cd6fb'
  primary: '#4cd6fb'
  on-primary: '#003642'
  primary-container: '#00b4d8'
  on-primary-container: '#00414f'
  inverse-primary: '#00677d'
  secondary: '#e6feff'
  on-secondary: '#003739'
  secondary-container: '#00f4fe'
  on-secondary-container: '#006c71'
  tertiary: '#ffb77d'
  on-tertiary: '#4d2600'
  tertiary-container: '#eb8f3b'
  on-tertiary-container: '#5d2f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b3ebff'
  primary-fixed-dim: '#4cd6fb'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#63f7ff'
  secondary-fixed-dim: '#00dce5'
  on-secondary-fixed: '#002021'
  on-secondary-fixed-variant: '#004f53'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#0e1416'
  on-background: '#dee3e6'
  surface-variant: '#303638'
  void-black: '#020810'
  deep-space: '#071122'
  nebula-navy: '#0c1f3f'
  stellar-border: '#0a2a4a'
  cyber-blue: '#00b4d8'
  neon-cyan: '#00f5ff'
  plasma-purple: '#7c3aed'
  hologram-violet: '#a855f7'
  bio-green: '#00ff88'
  star-white: '#e8f4ff'
  ice-blue: '#93c5fd'
  phantom-grey: '#1e3a5f'
  signal-dim: '#4a6785'
  alert-red: '#ff1f4e'
  plasma-orange: '#ff6d00'
  gradient-singularity: 'linear-gradient(135deg, #020810 0%, #071122 40%, #0c1f3f
    100%)'
  gradient-warp: 'linear-gradient(135deg, #00b4d8 0%, #7c3aed 50%, #00f5ff 100%)'
  gradient-anomaly: 'linear-gradient(135deg, #ff1f4e 0%, #7c3aed 60%, #ff6d00 100%)'
  gradient-bioluminescent: 'linear-gradient(180deg, #00ff88 0%, #00b4d8 100%)'
typography:
  display-quantum:
    fontFamily: Doto
    fontSize: 106px
    fontWeight: '900'
    lineHeight: '1.0'
  heading-lg:
    fontFamily: Orbitron
    fontSize: 48px
    fontWeight: '900'
    lineHeight: '1.0'
  heading:
    fontFamily: Orbitron
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.1'
  subheading:
    fontFamily: Orbitron
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.25'
  body:
    fontFamily: Rajdhani
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  mono-label:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1.2'
  caption:
    fontFamily: Space Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '0.8'
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  grid-gutter: 12px
  grid-margin: 20px
---

# Project Xenon Grid — Design Reference
> Alien command interface for tracking project states across the void: deep-space dark panels, neon-cyan data streams, and ice-white signal readouts on a void-black chassis.

**Theme:** deep space xenomorphic control grid

This dashboard should feel like an extraterrestrial operations interface — part alien biotechnology, part interstellar navigation console, part quantum computing terminal. The visual language draws from science fiction: bioluminescent organisms, star charts, holographic projections, and otherworldly circuitry. Every surface either absorbs light like the void or emits it like a plasma core.

The dominant canvas is near-absolute black, like deep space. Panels glow from within. Cyan and electric blue are the primary signal colors — the hum of active systems. Neon green marks living, breathing processes. Purple marks anomalous or alien states. White is starlight: rare, sharp, high-signal. Red is reserved for critical failure or irreversible action.

## Design Intent

- Make the interface feel like it was built by — or for — something non-human, then adapted for human operators.
- Use glow effects, pulsing indicators, and scanline overlays to suggest living, powered systems.
- Data should feel like it is being transmitted in real-time from a distant station.
- Use angular geometry, hexagonal motifs, and clipped corners to replace soft rounded convention.
- Preserve functional clarity: the sci-fi aesthetic must not obscure actual project data.
- Motion should feel like system activity, not animation for its own sake.

---

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void Black | `#020810` | `--color-void-black` | Page canvas, deepest background layer |
| Deep Space | `#071122` | `--color-deep-space` | Primary panel background, project card bodies |
| Nebula Navy | `#0c1f3f` | `--color-nebula-navy` | Elevated panels, hover surfaces, secondary containers |
| Stellar Border | `#0a2a4a` | `--color-stellar-border` | Panel borders, dividers, grid lines |
| Cyber Blue | `#00b4d8` | `--color-cyber-blue` | Primary accent, active links, selected filters, highlights |
| Neon Cyan | `#00f5ff` | `--color-neon-cyan` | Glow effects, critical live indicators, scan pulses |
| Plasma Purple | `#7c3aed` | `--color-plasma-purple` | Alien/anomalous states, special tags, mystic accents |
| Hologram Violet | `#a855f7` | `--color-hologram-violet` | Secondary alien accent, gradient partner to purple |
| Bio Green | `#00ff88` | `--color-bio-green` | LIVE status, healthy builds, successful deployments |
| Star White | `#e8f4ff` | `--color-star-white` | Primary text on dark panels, key data values |
| Ice Blue | `#93c5fd` | `--color-ice-blue` | Secondary text, metadata, timestamps, labels |
| Phantom Grey | `#1e3a5f` | `--color-phantom-grey` | Inactive rules, muted borders, disabled states |
| Signal Dim | `#4a6785` | `--color-signal-dim` | Muted text, inactive icons, stale indicators |
| Alert Red | `#ff1f4e` | `--color-alert-red` | Critical failure, blocked status, destructive confirmation |
| Plasma Orange | `#ff6d00` | `--color-plasma-orange` | Warning states, degraded performance, caution signals |
| Gradient Singularity | `linear-gradient(135deg, #020810 0%, #071122 40%, #0c1f3f 100%)` | `--gradient-singularity` | Deep-space panel backdrop |
| Gradient Warp | `linear-gradient(135deg, #00b4d8 0%, #7c3aed 50%, #00f5ff 100%)` | `--gradient-warp` | Active warp/featured project highlight strip |
| Gradient Anomaly | `linear-gradient(135deg, #ff1f4e 0%, #7c3aed 60%, #ff6d00 100%)` | `--gradient-anomaly` | Critical failure confirmation surface |
| Gradient Bioluminescent | `linear-gradient(180deg, #00ff88 0%, #00b4d8 100%)` | `--gradient-bioluminescent` | Live/healthy state glow bar |

---

## Tokens — Typography

### Primary UI — Navigation Console

- **Font:** `Orbitron`
- **Substitute:** `ui-sans-serif`, `system-ui`
- **Weights:** 400, 600, 700, 900
- **Role:** Dashboard title, project names, section headings, primary action buttons. Gives a distinctly sci-fi, engineered character.

### Technical Readout — Data Streams

- **Font:** `Space Mono`
- **Substitute:** `ui-monospace`, `monospace`
- **Weights:** 400, 700
- **Role:** Project IDs, repo slugs, build hashes, timestamps, status codes, environment names, API endpoints. Cold and precise.

### Secondary Body — Transmission Text

- **Font:** `Rajdhani`
- **Substitute:** `ui-sans-serif`, `system-ui`
- **Weights:** 300, 400, 600
- **Role:** Project summaries, activity descriptions, supporting body text. More readable than Orbitron at small sizes.

### Digital Display — Quantum Readout

- **Font:** `Doto`
- **Substitute:** `Orbitron`, `Press Start 2P`, `ui-monospace`
- **Weight:** 900
- **Role:** Large numerical readouts — active missions, failing nodes, deployed systems, anomaly count.

### Type Scale

| Role | Size | Line Height | Use |
|------|------|-------------|-----|
| caption | 10px | 0.8 | Dense status chips, environment badges, tiny hex labels |
| mono-label | 11px | 1.2 | Repo IDs, build hashes, timestamps, env codes |
| body | 14px | 1.5 | Project summaries, activity log entries |
| subheading | 18px | 1.25 | Card headings, metric group labels |
| heading | 36px | 1.1 | Dashboard section headings |
| heading-lg | 48px | 1.0 | Primary dashboard identity |
| display | 106px | 1.0 | Large quantum readout modules |

---

## Tokens — Spacing and Shapes

**Base unit:** 4px
**Density:** compact — information-first, minimal decorative whitespace

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 56 | 56px | `--spacing-56` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |

### Radii

- **Default panel:** 2px — nearly square, technical and angular
- **Status capsules:** 2px — avoid the SaaS pill look; use sharp chips
- **Filter tags:** 4px — slight softening only
- **Action buttons:** 0px or `clip-path` clipped corners — use clip-path for the angular sci-fi feel
- **Circular readouts:** 50% — only for deliberate circular display modules

### Clipped Corners (Sci-Fi Angular)

Prefer `clip-path` over `border-radius` for primary containers and action buttons:

```css
/* Standard sci-fi corner clip */
clip-path: polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px);

/* Large panel corner clip */
clip-path: polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px);
```

### Shadows and Glows

```css
--glow-cyan:     0 0 8px rgba(0, 245, 255, 0.6), 0 0 20px rgba(0, 180, 216, 0.3);
--glow-blue:     0 0 8px rgba(0, 180, 216, 0.5), 0 0 24px rgba(0, 120, 200, 0.2);
--glow-green:    0 0 8px rgba(0, 255, 136, 0.6), 0 0 20px rgba(0, 200, 100, 0.2);
--glow-purple:   0 0 8px rgba(124, 58, 237, 0.6), 0 0 24px rgba(168, 85, 247, 0.2);
--glow-red:      0 0 8px rgba(255, 31, 78, 0.7), 0 0 20px rgba(255, 31, 78, 0.3);
--shadow-panel:  0 4px 24px rgba(0, 0, 0, 0.8), 0 1px 0 rgba(0, 245, 255, 0.05);
```

Active panel borders should glow. Use `box-shadow` on the border to simulate powered-on display rims.

---

## Layout Model

The page is a full-viewport alien command grid. It must not open with a landing page or marketing copy. The first viewport is the operational dashboard.

### Desktop Layout

```
┌─────────────────────────────────────────────────────────┐
│  COMMAND STRIP — title · counts · filters · last sync   │
├──────────┬──────────────────────────────┬───────────────┤
│  STATUS  │                              │   TELEMETRY   │
│   RAIL   │     PROJECT MISSION GRID     │    COLUMN     │
│          │                              │               │
│  ALL     │  [card] [card] [card]        │  activity log │
│  LIVE    │  [card] [card] [card]        │  failing nodes│
│  BUILD   │  [card] [card] [card]        │  next actions │
│  BLOCK   │                              │  deploy queue │
│  STALE   │                              │               │
├──────────┴──────────────────────────────┴───────────────┤
│              TIMELINE — chronological event rail         │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout

- Command strip stays sticky at top.
- Status rail collapses to horizontal filter chips.
- Project cards go single-column; each keeps its full data density.
- Telemetry and timeline stack below the project list as collapsible panels.

---

## Core Components

### Command Strip

**Role:** Global orientation and operational control.

Background: `--color-void-black` with a bottom border using `--color-cyber-blue` at 1px, optionally glowing with `--glow-cyan` at low opacity. Include:

- Dashboard name in Orbitron, Star White
- Last sync timestamp in Space Mono, Ice Blue — format: `SYNC 14:32:07`
- Total mission count in a clipped-corner chip
- Filter controls (see Filter Chips below)
- One primary action if applicable

Add a subtle horizontal scanline overlay using a repeating linear gradient at 2px intervals, at 2% opacity — creates the sense of a live screen.

### Project Mission Card

**Role:** One project status module — a single node in the alien grid.

Use `--color-deep-space` background with a 1px border in `--color-stellar-border`. On hover, the border shifts to `--color-cyber-blue` and the card emits `--glow-blue`. Apply `clip-path` for angular corners.

Include:

- Project name in Orbitron, Star White
- Status code chip: `LIVE`, `BUILDING`, `REVIEW`, `BLOCKED`, `STALE`, `ARCHIVED` — see Status Indicator for colors
- Repo path or slug in Space Mono, Ice Blue
- Deployment target in Space Mono, Signal Dim
- Last update: `UPDATED 2026-05-10` in Space Mono, Ice Blue
- Build/deploy indicator: small glow dot
- Next action in Rajdhani, Star White — compact, one line

Padding: 12px–16px. Corner clip: standard sci-fi 8px polygon.

### Status Indicator

**Role:** Visual state signal — a powered node or dead signal.

Use Space Mono at 10–11px with a glowing dot or angular bracket indicator. Never use soft colored badges.

| State | Text Color | Dot / Accent | Glow |
|-------|-----------|--------------|------|
| `LIVE` | Star White | Bio Green dot | `--glow-green` |
| `BUILDING` | Cyber Blue | pulsing Cyber Blue dot | `--glow-blue` |
| `REVIEW` | Ice Blue | Hologram Violet bracket | `--glow-purple` |
| `BLOCKED` | Alert Red | Alert Red solid | `--glow-red` |
| `STALE` | Signal Dim | Phantom Grey dot | none |
| `ARCHIVED` | Phantom Grey | none | none |

### Quantum Readout Module

**Role:** Large critical number — the alien telemetry core.

Background: `--color-deep-space` with `--glow-cyan` border. Large number in Doto at 80–106px, Star White or Neon Cyan. Small label in Space Mono at 11px, Ice Blue above or below. Examples:

- `12 ACTIVE MISSIONS`
- `3 FAILING NODES`
- `1 DEPLOY QUEUED`
- `4 STALE SIGNALS`

### Critical Action Button

**Role:** High-stakes operation — deploy, force sync, archive, confirm destruction.

Use `--color-alert-red` background or `--gradient-anomaly`. Apply clipped-corner polygon shape. Orbitron font, Star White, uppercase compact label. Strong glow on hover: `--glow-red`. Examples:

- `DEPLOY`
- `FORCE SYNC`
- `CONFIRM DELETE`
- `RUN DIAGNOSTICS`

Never use red for navigation or low-stakes actions.

### Ghost Button / Secondary Action

**Role:** Navigation, low-risk secondary action.

Transparent background. 1px border in `--color-stellar-border`. Orbitron or Rajdhani font, Ice Blue text. On hover: border shifts to `--color-cyber-blue`, faint `--glow-blue`. Use angular corner clip.

### Filter Chips

**Role:** Fast operational state filtering.

Small, clipped-corner chips. Inactive: `--color-nebula-navy` background, Ice Blue text, `--color-stellar-border` border. Active: `--color-cyber-blue` border with `--glow-cyan`, Star White text. Never use large rounded pills — keep chips tight and angular.

### Telemetry Log

**Role:** Live activity stream — alien data feed.

Dark display panel using `--color-deep-space` with a `--color-cyber-blue` top border. Space Mono timestamps and event codes. Each entry on one line:

```
14:32:07  BUILD PASS     kaohsiung-travel-web
13:05:44  DEPLOY READY   crm-demo
11:47:01  SIGNAL LOST    stripe-dashboard
09:22:18  ANOMALY        auth-service ENV MISSING
```

Failed or blocked events use `--color-alert-red`. Live/pass events use `--color-bio-green`. Warnings use `--color-plasma-orange`. All other entries: Ice Blue.

Add a scanline texture to this panel at 3% opacity for the alien-screen effect.

### Project Timeline

**Role:** Chronological mission log and roadmap rail.

Desktop: horizontal strip. Mobile: vertical stack. Each node: mono event ID, date, project name, status chip. Nodes connect via a thin `--color-stellar-border` line. Active or recent nodes glow with `--glow-cyan`. Future nodes use Signal Dim. Use angular markers — chevron or diamond shapes — not circles.

---

## Visual Effects Reference

### Scanlines

Apply to any surface that should feel like an active display screen:

```css
background-image: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0, 245, 255, 0.015) 2px,
  rgba(0, 245, 255, 0.015) 4px
);
```

### Grid Overlay

Apply to the main canvas for a deep-space star-chart feel:

```css
background-image:
  linear-gradient(rgba(0, 180, 216, 0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 180, 216, 0.04) 1px, transparent 1px);
background-size: 32px 32px;
```

### Glow Border on Active Cards

```css
border: 1px solid var(--color-cyber-blue);
box-shadow: var(--glow-cyan), inset 0 0 20px rgba(0, 245, 255, 0.03);
```

### Pulse Animation — Live Status Dot

```css
@keyframes xenon-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 4px var(--color-bio-green); }
  50%       { opacity: 0.5; box-shadow: 0 0 12px var(--color-bio-green); }
}
```

### Data Flicker — Refresh Indicator

```css
@keyframes data-flicker {
  0%   { opacity: 1; }
  92%  { opacity: 1; }
  93%  { opacity: 0.4; }
  94%  { opacity: 1; }
  97%  { opacity: 0.7; }
  100% { opacity: 1; }
}
```

---

## Data Content Rules

Use operational transmission language:

- Prefer `DEPLOYED`, `BUILDING`, `BLOCKED`, `SIGNAL LOST`, `ANOMALY`, `STALE`, `LOCAL ONLY`, `ENV MISSING`.
- Use Space Mono for all codes, hashes, IDs, and timestamps.
- Every project card must answer: what is it, where is it, what state is it in, what needs to happen next.
- Long descriptions go in expandable detail panels — never in the primary grid.

---

## Imagery and Graphics

No photography, illustration, or decorative stock art. Use functional technical graphics only:

- Hex grid overlays and circuit-trace patterns as panel backgrounds
- Sparkline charts for build/deploy frequency — rendered in Cyber Blue or Bio Green
- Star-map style topology diagrams for project relationships
- Angular status brackets and diamond node markers
- Environment badge chips with clipped corners
- Warp-line dividers (thin angled lines at 30–45°) between sections
- Bioluminescent dot clusters as decorative but data-suggestive texture

### Hex Grid Motif

Use a CSS or SVG hexagonal grid at very low opacity (3–6%) behind dark panels to suggest alien architecture:

```css
background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='100'><polygon points='28,2 54,16 54,44 28,58 2,44 2,16' fill='none' stroke='%2300b4d8' stroke-width='0.5' opacity='0.15'/></svg>");
```

---

## Interaction and Motion

All motion should feel like system state change, not UI animation:

- **Card hover:** border shifts from `--color-stellar-border` to `--color-cyber-blue` instantly, glow fades in over 150ms.
- **Status pulse:** `LIVE` and `BUILDING` dots pulse on a 2s loop — slow enough to feel biological, not distracting.
- **Data refresh:** counters tick/flicker using `data-flicker` animation.
- **Panel expand:** project detail slides open like a scanner panel extending — fast (200ms), linear easing.
- **Filter switch:** grid reorders with a 120ms fade — no bouncy spring easing.
- **No slow fades, no bouncy ease-in-out, no parallax.**

---

## Do's

- Use `#020810` as the void canvas behind everything.
- Use `#071122` for all embedded panels and project cards.
- Glow active borders and live indicators — light should feel emitted, not reflected.
- Use `clip-path` for angular corners on cards and buttons.
- Use Space Mono for all technical metadata.
- Apply scanline texture to any surface that represents a live data screen.
- Reserve `#ff1f4e` strictly for failure, block, and destructive confirmation.
- Use `#00ff88` only for confirmed live/healthy states.
- Keep the hex-grid and grid-overlay textures subtle — they support atmosphere, not dominate it.

## Don'ts

- Do not use a white or light canvas — the void must feel dark.
- Do not use soft rounded corners everywhere — angular geometry is the rule.
- Do not use gradients casually — only for featured project highlights and critical surfaces.
- Do not make red common — every red element must demand attention.
- Do not use generic SaaS blues (`#3b82f6`, etc.) — Cyber Blue and Neon Cyan are the defined palette.
- Do not use drop shadows that look like material design elevation — use glow instead.
- Do not build a landing page before the dashboard.
- Do not use Orbitron for long prose — it is a display and heading font only.
- Do not animate for decorative purposes — motion must mean something.

---

## CSS Custom Properties

```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Space+Mono:wght@400;700&family=Rajdhani:wght@300;400;600&family=Doto:wght@900&display=swap');

:root {
  /* Colors */
  --color-void-black:       #020810;
  --color-deep-space:       #071122;
  --color-nebula-navy:      #0c1f3f;
  --color-stellar-border:   #0a2a4a;
  --color-cyber-blue:       #00b4d8;
  --color-neon-cyan:        #00f5ff;
  --color-plasma-purple:    #7c3aed;
  --color-hologram-violet:  #a855f7;
  --color-bio-green:        #00ff88;
  --color-star-white:       #e8f4ff;
  --color-ice-blue:         #93c5fd;
  --color-phantom-grey:     #1e3a5f;
  --color-signal-dim:       #4a6785;
  --color-alert-red:        #ff1f4e;
  --color-plasma-orange:    #ff6d00;

  /* Gradients */
  --gradient-singularity:     linear-gradient(135deg, #020810 0%, #071122 40%, #0c1f3f 100%);
  --gradient-warp:            linear-gradient(135deg, #00b4d8 0%, #7c3aed 50%, #00f5ff 100%);
  --gradient-anomaly:         linear-gradient(135deg, #ff1f4e 0%, #7c3aed 60%, #ff6d00 100%);
  --gradient-bioluminescent:  linear-gradient(180deg, #00ff88 0%, #00b4d8 100%);

  /* Glows */
  --glow-cyan:    0 0 8px rgba(0, 245, 255, 0.6), 0 0 20px rgba(0, 180, 216, 0.3);
  --glow-blue:    0 0 8px rgba(0, 180, 216, 0.5), 0 0 24px rgba(0, 120, 200, 0.2);
  --glow-green:   0 0 8px rgba(0, 255, 136, 0.6), 0 0 20px rgba(0, 200, 100, 0.2);
  --glow-purple:  0 0 8px rgba(124, 58, 237, 0.6), 0 0 24px rgba(168, 85, 247, 0.2);
  --glow-red:     0 0 8px rgba(255, 31, 78, 0.7), 0 0 20px rgba(255, 31, 78, 0.3);
  --shadow-panel: 0 4px 24px rgba(0, 0, 0, 0.8), 0 1px 0 rgba(0, 245, 255, 0.05);

  /* Typography */
  --font-orbitron:    "Orbitron", ui-sans-serif, system-ui;
  --font-space-mono:  "Space Mono", ui-monospace, monospace;
  --font-rajdhani:    "Rajdhani", ui-sans-serif, system-ui;
  --font-doto:        "Doto", "Orbitron", "Press Start 2P", ui-monospace;

  /* Type scale */
  --text-caption:    10px;
  --text-mono-label: 11px;
  --text-body:       14px;
  --text-subheading: 18px;
  --text-heading:    36px;
  --text-heading-lg: 48px;
  --text-display:    106px;

  --leading-caption:    0.8;
  --leading-body:       1.5;
  --leading-subheading: 1.25;
  --leading-heading:    1.1;
  --leading-display:    1.0;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4:    4px;
  --spacing-8:    8px;
  --spacing-12:   12px;
  --spacing-16:   16px;
  --spacing-20:   20px;
  --spacing-24:   24px;
  --spacing-32:   32px;
  --spacing-48:   48px;
  --spacing-56:   56px;
  --spacing-64:   64px;
  --spacing-80:   80px;

  /* Shape */
  --radius-default: 2px;
  --radius-tag:     4px;
  --radius-pill:    9999px;
  --clip-card:      polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px);
  --clip-panel:     polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px);
  --clip-button:    polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px);

  /* Surfaces */
  --surface-canvas:  var(--color-void-black);
  --surface-panel:   var(--color-deep-space);
  --surface-raised:  var(--color-nebula-navy);
}
```

---

## Example Component Prompts

1. **Project Mission Card:** Dark card on `#071122`, Star White Orbitron project name, clipped 8px corner, 1px `#0a2a4a` border that glows cyan on hover. Space Mono metadata. Bio Green pulse dot for LIVE status. 12px padding.

2. **Quantum Readout:** `#071122` panel with cyan glow border, large Doto number in Neon Cyan, Space Mono label below. Shows failing node count or active mission count.

3. **Command Strip:** `#020810` background with 1px Cyber Blue bottom border and scanline overlay. Orbitron dashboard name, Space Mono sync timestamp, filter chips in Nebula Navy.

4. **Telemetry Log:** `#071122` display panel, Space Mono entries, Bio Green for pass, Alert Red for failure, Ice Blue for neutral. Scanline texture at 3% opacity.

5. **Critical Deploy Button:** Alert Red background with clip-path angular shape, Star White Orbitron label, strong red glow on hover. Only for destructive or high-stakes actions.

6. **Filter Chip Active:** `#0a2a4a` border shifts to Cyber Blue with cyan glow, Star White Orbitron text. Inactive: Stellar Border, Ice Blue.

---

## Design Reference Mapping

| Old Mission Control Element | Xenon Grid Translation |
|-----------------------------|------------------------|
| Light grey panel chassis | Void Black deep-space canvas |
| Dark embedded display | Deep Space panel with scanline texture |
| Urgency Red | Alert Red — same reservation rule |
| Active Blue | Cyber Blue + Neon Cyan glow system |
| SF Mono technical labels | Space Mono — same role, alien tone |
| Doto large numbers | Doto — retained, now in Neon Cyan |
| Industrial rounded modules | Clipped-corner angular panels |
| Aircraft control metaphor | Alien command grid metaphor |
| Warning triangles | Alert Red glow brackets and angular markers |
| Timeline rail | Angular chevron event rail |
