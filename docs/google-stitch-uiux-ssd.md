# Google Stitch UIUX SSD

## Goal

Design a complete UIUX concept for Dashboard Project: a sci-fi mission-control dashboard for Jacky's personal software projects.

The interface should look like an alien command grid: dark deep-space canvas, neon cyan signal accents, compact project cards, clipped angular panels, status lights, telemetry logs, and timeline rails. It should be usable first and atmospheric second.

Do not make a marketing landing page. The first screen is the operational dashboard.

## App Structure

Create UI for two related web apps:

- Public dashboard for visitors.
- Admin dashboard for project management.

The public dashboard is the visual centerpiece. The admin dashboard should be denser, practical, and still visually connected to the same design language.

## Visual Direction

Name: Xenon Grid

Style:

- Deep-space mission control console.
- Alien operations interface.
- Technical, compact, angular.
- Neon cyan and blue highlights.
- Green only for healthy/live status.
- Red only for blocked, failed, destructive, or critical states.

Avoid:

- Generic SaaS landing page.
- White/light dashboard canvas.
- Large marketing hero.
- Soft pill-heavy UI.
- Rounded card-heavy startup aesthetic.
- Decorative stock photography.

## Core Color Intent

Use this palette direction:

- Void black background.
- Deep navy panels.
- Cyan/blue borders and active states.
- Neon cyan glow for live data and selected controls.
- Bio green for live/healthy.
- Purple for anomalous/review/special states.
- Orange for warnings.
- Red only for critical/destructive states.
- Ice blue for secondary text and metadata.
- Star white for primary labels.

## Typography Intent

Use a sci-fi heading font for titles and project names.

Use monospace for:

- Timestamps
- Project slugs
- Status codes
- Build/deploy labels
- URLs
- Technical metadata

Use a readable condensed sans font for summaries and admin form labels.

## Public Dashboard Screen

### Layout

Desktop layout:

```txt
Top command strip
Left status rail | Center project mission grid | Right telemetry column
Bottom timeline rail
```

Mobile layout:

```txt
Sticky command strip
Horizontal filter chips
Single-column project cards
Telemetry panel
Timeline panel
```

### Top Command Strip

Design a sticky top bar with:

- Dashboard title: `JACKY PROJECT GRID` or `XENON GRID`.
- Sync timestamp: `SYNC 14:32:07`.
- Total count: `12 MISSIONS`.
- Filter controls.
- Small refresh/sync action.

The command strip should feel like the top console of a live control system.

### Status Rail / Filter Chips

Filters:

- All
- Live
- Building
- Review
- Blocked
- Stale
- Archived

Use compact angular chips or a vertical rail.

Each filter should include a count where possible.

### Project Mission Grid

Create a grid of project cards.

Each card must include:

- Project name
- Status indicator
- Short summary
- Repo slug or GitHub path
- Demo/deploy target
- Tech stack tags
- Last updated date
- Next action
- GitHub button
- Demo button
- Detail button

Example cards:

```txt
Dashboard Project
STATUS: BUILDING
github.com/jacky105402002/dashboard-project
TARGET: Zeabur
UPDATED 2026-05-06
NEXT: Scaffold monorepo
Stack: React, NestJS, Prisma, PostgreSQL
```

```txt
Engineer Post Writer
STATUS: LIVE
github.com/jacky105402002/engineer-post-writer
TARGET: GitHub
UPDATED 2026-05-01
NEXT: Add examples
Stack: Codex Skill, Markdown, Workflow
```

Card behavior:

- Featured cards should be visually highlighted but still compact.
- Hover/focus shows cyan border glow.
- Status dot pulses only for live/building states.
- Actions must be clearly separated from metadata.

### Project Detail State

Design a drawer, modal, or expandable panel.

Content:

- Project name and status.
- Full description.
- GitHub URL.
- Demo URL.
- Tech stack.
- Category.
- Latest update.
- Timeline entries.
- Primary action: open demo.
- Secondary action: open GitHub.

On mobile, use a full-width panel.

### Telemetry Column

Right-side live log panel.

Example entries:

```txt
14:32:07  BUILD PASS     dashboard-project
13:05:44  DEPLOY READY   engineer-post-writer
11:47:01  SIGNAL LOST    old-demo
09:22:18  ANOMALY        api ENV MISSING
```

Use monospace text. Color events by severity:

- Pass/live: green.
- Warning: orange.
- Failure/block: red.
- Neutral: ice blue.
- Anomaly/review: purple.

### Timeline Rail

Bottom timeline with project events.

Each node:

- Date
- Project name
- Event label
- Status marker

Use angular diamond/chevron markers instead of round dots.

## Public Dashboard States

Design these:

- Loading: skeleton cards or scanning placeholders.
- Empty: no public projects yet.
- Filtered empty: no projects match current filters.
- Error: failed to load project data, retry action.
- Detail open.
- Mobile stacked layout.

## Admin Dashboard

The admin area should feel like a control console for editing mission records. It can be less theatrical than the public dashboard but should still use the same dark angular system.

### Admin Login

Fields:

- Email
- Password

Actions:

- Login

States:

- Loading
- Invalid credentials
- Disabled button when empty

### Admin Overview

Layout:

- Top admin command bar.
- Summary readouts.
- Project list/table.
- Filters and search.
- Create project action.

Summary readouts:

- Total projects
- Public projects
- Live projects
- Blocked projects
- Featured projects

Project list columns:

- Sort
- Name
- Status
- Category
- Public
- Featured
- Last updated
- Actions

Actions:

- Edit
- Archive/delete
- Reorder

On mobile, convert the table into stacked project management cards.

### Project Editor

Design a two-column editor on desktop:

Left main form:

- Name
- Slug
- Summary
- Description
- Category
- Tech stack
- GitHub URL
- Demo URL

Right operations panel:

- Status
- Public toggle
- Featured toggle
- Sort order
- Last updated date
- Save
- Cancel
- Delete/archive

Form behavior:

- Show unsaved changes.
- Show validation errors inline.
- Show save success.
- Confirm destructive actions.

## Data Fields

Project:

```txt
id
name
slug
summary
description
status
category
githubUrl
demoUrl
techStack
isPublic
isFeatured
sortOrder
lastUpdatedAt
createdAt
updatedAt
```

User:

```txt
id
name
email
role
createdAt
updatedAt
```

## Status Labels

Use these display labels in the UI:

- LIVE
- BUILDING
- REVIEW
- BLOCKED
- STALE
- ARCHIVED

Status meaning:

- LIVE: public and healthy.
- BUILDING: active work in progress.
- REVIEW: planned or being evaluated.
- BLOCKED: cannot proceed or has failure.
- STALE: paused or not recently updated.
- ARCHIVED: no longer active.

## Required Components

Create reusable component designs for:

- Command strip
- Filter chip
- Status indicator
- Project card
- Featured project card
- Project detail drawer
- Telemetry log
- Timeline node
- Quantum readout/stat panel
- Ghost button
- Critical/destructive button
- Admin project table
- Admin project editor form
- Form validation message
- Delete confirmation dialog

## UX Priorities

1. Visitors should immediately understand the project portfolio.
2. GitHub and demo links should be easy to find.
3. Status must be scannable at a glance.
4. Admin editing should be fast and predictable.
5. The interface should feel sci-fi without hiding the data.
6. Mobile layout must remain readable and action-friendly.

## Output Expected From Google Stitch

Generate:

- Public dashboard desktop screen.
- Public dashboard mobile screen.
- Project detail open state.
- Public loading/empty/error states.
- Admin login screen.
- Admin project overview screen.
- Admin project editor screen.
- Admin delete confirmation dialog.

Use realistic sample project data and keep all screen text concise.
