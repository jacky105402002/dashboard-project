# Project Mission Control Dashboard - Design Reference
> Aircraft control dashboard for tracking many project states on one page: high-contrast modular interfaces on a rigid light-grey chassis with urgent red signals.

**Theme:** light industrial control panel

This dashboard should feel like a compact mission-control surface for personal software projects. It borrows the retro-futuristic aircraft control panel language from the Lift-off challenge reference, then translates the rocket-launch metaphor into project operations: build health, deploy readiness, repository activity, deadlines, blockers, and next actions.

The dominant canvas is light grey, like a metal chassis. Dark embedded panels behave like screens. Red is reserved for urgent action, critical failures, or deployment confirmation. Blue is used for navigational links and selected details. Most UI should be precise, compact, and data-forward rather than decorative.

## Design Intent

- Treat each project as a mission module, not a generic SaaS card.
- Make the first screen useful immediately: status matrix, key numbers, and recent activity should be visible without a landing-page hero.
- Use dense, clearly bounded panels with technical labels, counters, and status strips.
- Preserve strong contrast: black text on grey chassis, white text on dark displays.
- Keep red rare so it always means action, risk, failure, or deployment.
- Avoid soft, friendly dashboard conventions that weaken the control-panel feel.

## Tokens - Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Control Panel Grey | `#e5e7eb` | `--color-control-panel-grey` | Page canvas, main chassis, top-level panel background, light borders |
| Display Black | `#11161c` | `--color-display-black` | Embedded screens, project cards, log panels, metric readouts |
| Obsidian Grey | `#000000` | `--color-obsidian-grey` | Primary text on light backgrounds, heavy dividers, dark icons |
| Digital White | `#ffffff` | `--color-digital-white` | Text on dark panels, active controls, light highlights |
| Graphite | `#bbbbbb` | `--color-graphite` | Secondary borders, inactive rules, pale dividers |
| Steel Grey | `#a3a3a3` | `--color-steel-grey` | Muted text, inactive icons, disabled states |
| Slate Blue | `#575c75` | `--color-slate-blue` | Secondary text, metadata, small technical labels |
| Urgency Red | `#f43325` | `--color-urgency-red` | Failed builds, critical blockers, deploy confirmation, primary action |
| Active Blue | `#0078a8` | `--color-active-blue` | Links, selected filters, active project routes |
| Gradient Night | `linear-gradient(135deg, rgb(201, 203, 228) 0%, rgb(45, 47, 65) 30%, rgb(27, 28, 46) 100%)` | `--gradient-gradient-night` | Rare technical backdrop or mini-map style visualization |
| Gradient Combustion | `linear-gradient(rgb(244, 51, 37) 17.31%, rgb(255, 149, 141) 25.48%, rgb(210, 39, 26) 43.27%, rgb(210, 39, 26) 71.15%, rgb(131, 19, 11) 94.71%)` | `--gradient-gradient-combustion` | Critical deploy or destructive confirmation surface |

## Tokens - Typography

### Primary UI

- **Font:** `proxima-nova`
- **Substitute:** `system-ui`
- **Weights:** 400, 600, 700, 800
- **Role:** Project names, section headings, buttons, filters, readable body text.

### Technical Labels

- **Font:** `SF Mono`
- **Substitute:** `ui-monospace`, `monospace`
- **Weights:** 400, 500
- **Role:** project IDs, repo names, build IDs, timestamps, status codes, environment names.

### Minor Body Text

- **Font:** `Helvetica Neue`
- **Substitute:** `system-ui`
- **Weight:** 400
- **Role:** very small supporting text when a quieter tone is needed.

### Digital Display

- **Font:** `Doto`
- **Substitute:** `Press Start 2P`, `ui-monospace`
- **Weight:** 900
- **Role:** large numerical readouts such as active projects, failing checks, deployed count, stale project count.

### Type Scale

| Role | Size | Line Height | Use |
|------|------|-------------|-----|
| caption | 10px | 0.8 | Dense technical chips and tiny labels |
| mono-label | 11px | 1.1-1.5 | Repo IDs, timestamps, env labels |
| body | 14px | 1.25-1.5 | Project summaries and activity text |
| subheading | 18px | 1.25 | Card headings and grouped metrics |
| heading | 36px | 1.0-1.16 | Dashboard title or major section heading |
| heading-lg | 48px | 1.0-1.1 | Primary dashboard statement on wide screens |
| display | 106px | 1.0 | Large numeric readout modules |

## Tokens - Spacing and Shapes

**Base unit:** 4px  
**Density:** compact

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
| 180 | 180px | `--spacing-180` |

### Radii

- **Default panel radius:** 4px
- **Pills and status capsules:** 9999px
- **Large circular control:** 270.89px or 50%
- **Original reference card radius:** 127.397px, only for intentionally rounded industrial modules. Do not use this on every project card.

### Shadows

- `--shadow-subtle`: `rgba(0, 0, 0, 0.8) 0px 0px 2px 0px`
- `--shadow-subtle-2`: `rgba(255, 255, 255, 0.5) 0px 0px 2px 0px`

Use shadows sparingly. Most hierarchy should come from borders, contrast, and embedded dark displays.

## Layout Model

The page is a full-bleed project control board. It should not start with a marketing hero. The primary viewport must show the actual dashboard.

Recommended desktop layout:

- **Top command strip:** dashboard title, project count, global filters, last refresh, primary action.
- **Left status rail:** compact system summary such as `ALL`, `LIVE`, `BUILDING`, `BLOCKED`, `STALE`.
- **Center project matrix:** dense grid of project mission cards.
- **Right telemetry column:** recent activity, failing checks, next actions, deployment queue.
- **Bottom timeline band:** project roadmap or chronological event strip.

Recommended mobile layout:

- Keep the command strip sticky.
- Collapse the status rail into segmented filters.
- Project cards become a single column, but each card keeps its dark display header and compact metadata.
- Activity and timeline become stacked panels below the project list.

## Core Components

### Command Strip

**Role:** Global orientation and control.

Use Control Panel Grey background with black text, thin graphite borders, and compact mono metadata. Include the dashboard name, last sync timestamp, total project count, and filter controls. Actions should be icon-first when possible.

### Project Mission Card

**Role:** One project status module.

Use Display Black for the main body with Digital White text. Include:

- Project name
- Short status code such as `LIVE`, `DEV`, `REVIEW`, `BLOCKED`, `ARCHIVED`
- Repository or local path
- Deployment target
- Last update timestamp
- Build/deploy indicator
- Next action

Keep padding tight: 8px to 16px. Use 4px radius for practical dashboard cards unless creating a special circular/rounded module.

### Status Indicator

**Role:** Small visual state feedback.

Use SF Mono at 10-12px. Pair short text with a dot, triangle, or line indicator.

State color guidance:

- `LIVE`: Digital White on Display Black, optional Active Blue accent
- `READY`: black text on light panel, subtle active marker
- `BUILDING`: Active Blue
- `WARNING`: Urgency Red, but low surface area
- `FAILED`: Urgency Red with strong contrast
- `STALE`: Steel Grey or Slate Blue

### Digital Number Display

**Role:** Large count or key operational number.

Use Display Black background and Digital White text. Use Doto at large sizes when available. Suitable metrics:

- Active projects
- Failed checks
- Ready deployments
- Stale projects
- Open actions

Never use the display font for long words or body text.

### Critical Action Button

**Role:** High-stakes action such as deploy, archive, stop job, or force refresh.

Use Urgency Red background with Digital White text. Use pill or circular shape. Do not use red for ordinary navigation.

Examples:

- `DEPLOY`
- `RUN CHECKS`
- `FIX FAILED`
- `CONFIRM`

### Ghost Button

**Role:** Secondary navigation or low-risk action.

Transparent background, black text on light panels or white text on dark panels. Minimal padding. Use thin underline, arrow icon, or compact label rather than a large decorative button.

### Filter Capsules

**Role:** Fast state filtering.

Use pill radius. Active filters can use Display Black with Digital White text or Active Blue accent. Inactive filters stay light grey with graphite borders.

### Telemetry Log

**Role:** Recent activity and system events.

Use a dark display panel with mono timestamps and short event descriptions. Keep entries concise:

- `14:32 BUILD PASS / kaohsiung-travel-web`
- `13:05 DEPLOY READY / crm-demo`
- `11:47 ENV MISSING / stripe-dashboard`

### Project Timeline

**Role:** Roadmap and recent milestones.

Use a horizontal rail on desktop and a vertical rail on mobile. Each event should include a mono event ID, date, project name, and status. Avoid decorative timeline cards; keep it like an engineering readout.

## Data Content Rules

Use compact operational language:

- Prefer `DEPLOYED`, `READY`, `BLOCKED`, `STALE`, `LOCAL ONLY`, `NEEDS ENV`.
- Prefer timestamps and short codes over long prose.
- Every project card should answer: what is it, where is it, what state is it in, what needs to happen next.
- Long descriptions belong in expandable detail panels, not in the project matrix.

## Imagery and Graphics

Avoid photography and illustration. Use functional technical graphics:

- tiny grid maps for project topology
- line charts for build/deploy frequency
- small sparkline panels
- status dots and warning triangles
- repo/network diagrams
- environment badges

Any visual element should help explain state or structure. No decorative orbs, stock images, or atmospheric backgrounds.

## Interaction and Motion

Motion should feel mechanical and purposeful:

- Fast hover states on project cards.
- Small flicker or pulse only for live/building/failed indicators.
- Expanding project details should slide or snap like opening a panel.
- Counters may tick when data refreshes.
- Avoid slow, soft, bouncy motion.

## Do's

- Use `#e5e7eb` as the dashboard chassis.
- Use `#11161c` for embedded displays and dense project modules.
- Keep project information compact and scannable.
- Reserve `#f43325` for critical status and primary high-stakes actions.
- Use SF Mono for technical metadata.
- Use clear borders and panel divisions.
- Make the dashboard useful in the first viewport.
- Keep cards and controls stable in size so status text does not shift layout.

## Don'ts

- Do not build a landing page before the dashboard.
- Do not use red for decoration or ordinary links.
- Do not make the page feel like a generic SaaS analytics dashboard.
- Do not use large rounded cards everywhere; use 4px radius for most practical surfaces.
- Do not fill the UI with gradients.
- Do not use dark blue or purple as the dominant palette.
- Do not place cards inside cards.
- Do not write explanatory onboarding copy inside the UI.
- Do not use the Doto/pixel display font for long project names.

## CSS Custom Properties

```css
:root {
  --color-control-panel-grey: #e5e7eb;
  --color-display-black: #11161c;
  --color-obsidian-grey: #000000;
  --color-digital-white: #ffffff;
  --color-graphite: #bbbbbb;
  --color-steel-grey: #a3a3a3;
  --color-slate-blue: #575c75;
  --color-urgency-red: #f43325;
  --color-active-blue: #0078a8;

  --gradient-gradient-night: linear-gradient(135deg, rgb(201, 203, 228) 0%, rgb(45, 47, 65) 30%, rgb(27, 28, 46) 100%);
  --gradient-gradient-combustion: linear-gradient(rgb(244, 51, 37) 17.31%, rgb(255, 149, 141) 25.48%, rgb(210, 39, 26) 43.27%, rgb(210, 39, 26) 71.15%, rgb(131, 19, 11) 94.71%);

  --font-proxima-nova: "proxima-nova", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-sf-mono: "SF Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-helvetica-neue: "Helvetica Neue", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-doto: "Doto", "Press Start 2P", ui-monospace, monospace;

  --text-caption: 10px;
  --text-body: 14px;
  --text-subheading: 18px;
  --text-heading: 36px;
  --text-heading-lg: 48px;
  --text-display: 106px;

  --leading-caption: 0.8;
  --leading-body: 1.5;
  --leading-subheading: 1.25;
  --leading-heading: 1.16;
  --leading-heading-lg: 1.1;
  --leading-display: 1;

  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-56: 56px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-180: 180px;

  --radius-default: 4px;
  --radius-cards-reference: 127.397px;
  --radius-buttons: 270.89px;
  --radius-pills: 9999px;

  --shadow-subtle: rgba(0, 0, 0, 0.8) 0px 0px 2px 0px;
  --shadow-subtle-2: rgba(255, 255, 255, 0.5) 0px 0px 2px 0px;

  --surface-canvas: #e5e7eb;
  --surface-display: #11161c;
  --surface-elevated-control: #ffffff;
}
```

## Example Component Prompts

1. **Project Mission Card:** Create a compact dark display card for one project. Use `#11161c` background, white project name, SF Mono metadata, a small status capsule, last deploy time, and one next action. Use 4px radius and 12px padding.

2. **Critical Deploy Control:** Create a red pill or circular button for a high-stakes deploy action. Use `#f43325`, white text, compact uppercase label, and strong disabled/confirmation states.

3. **Dashboard Telemetry Strip:** Create a top strip on `#e5e7eb` with black title, mono timestamp, active project count, failing check count, and segmented filters.

4. **Digital Metric Module:** Create a dark module with a large Doto number, small SF Mono label, and compact status description. Use this for failed builds or ready deployments.

5. **Activity Log Panel:** Create a dark log display with mono timestamps, short event codes, and red only for failed or blocked events.

## Mapping From Reference To This Dashboard

| Lift-off Reference Element | Dashboard Translation |
|----------------------------|-----------------------|
| Lift-off button | Deploy / Run checks / Confirm critical action |
| Flight tag status | Project health status |
| Aircraft control panel | Dashboard chassis |
| Dark embedded display | Project card, activity log, metric module |
| Large Doto number | Project counts and operational metrics |
| Warning indicators | Failed builds, missing env vars, stale projects |
| Roadmap | Project timeline and milestone rail |
| Technical map/readout | Repo topology, environment map, deploy target view |

