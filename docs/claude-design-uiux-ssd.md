# Claude Design UIUX SSD

## Purpose

Create the UIUX design for Dashboard Project, a personal mission-control dashboard that displays Jacky's software projects in one place.

Claude Design already has the Xenon Grid design system configured. Do not spend effort redefining colors, typography, glow effects, clipped corners, or visual tokens. Focus on product structure, information architecture, page behavior, interaction states, and component responsibilities.

## Product Summary

Dashboard Project has two web experiences supported by one API:

- Public dashboard: visitors browse Jacky's public projects and open GitHub/demo links.
- Admin dashboard: Jacky manages the project showcase data.
- API/database: stores projects and admin accounts.

The product should feel like a functional project operations console, not a portfolio landing page. The first screen should be the dashboard itself.

## Primary Users

### Visitor

Goal: quickly understand what Jacky has built, which projects are live, and where to view code or demos.

Needs:

- Scan projects by status, category, and featured priority.
- Open GitHub and demo links.
- Understand whether each project is live, building, blocked, stale, or archived.
- See enough project detail without being forced into long prose.

### Admin

Goal: maintain project records without touching code.

Needs:

- Login securely.
- Create, edit, delete, reorder, publish, unpublish, and feature projects.
- Manage status, category, tech stack, links, summary, description, and sort order.
- See validation feedback before saving.

## Information Architecture

```txt
Public Web
- Dashboard
  - Command strip
  - Status/category filters
  - Featured project emphasis
  - Project mission grid
  - Project detail drawer or expandable panel
  - Telemetry/activity panel
  - Timeline/roadmap panel

Admin Web
- Login
- Admin overview
  - Project table/list
  - Status summary
  - Quick create
- Project editor
  - Basic info
  - Links
  - Classification
  - Visibility and ordering
  - Description
  - Save/publish controls
- Admin accounts
```

## Public Dashboard Requirements

### Command Strip

Persistent top control strip.

Must include:

- Product identity: `XENON GRID` or `JACKY PROJECT GRID`.
- Last sync timestamp.
- Total public project count.
- Active filter summary.
- Optional primary action: refresh/sync.

Behavior:

- Sticky on scroll.
- On mobile, wrap controls cleanly into two rows if needed.
- Never become a marketing hero.

### Status Filters

Support filtering by:

- All
- Live
- Building
- Review
- Blocked
- Stale
- Archived

Optional category filtering:

- Web app
- API
- Tool
- Experiment
- Automation
- Design system

Behavior:

- Active filter must be obvious.
- Empty filtered state should explain no matching projects and provide a clear reset action.

### Project Mission Grid

Each project card must answer:

- What is the project?
- What is its current state?
- Where is the source code?
- Where is the live/demo site?
- What should happen next?

Card fields:

- Name
- Status
- Summary
- Category
- Tech stack
- GitHub URL
- Demo URL
- Last updated date
- Featured flag
- Next action

Card actions:

- Open GitHub
- Open demo
- View details

Behavior:

- Featured projects appear first.
- Custom sort order should be respected.
- Cards should support hover/focus states.
- Links should be accessible by keyboard.

### Project Detail

Use either a right-side drawer, modal, or expandable scanner panel.

Must include:

- Full description
- Tech stack
- Status history or latest update
- GitHub and demo links
- Project metadata

Behavior:

- Detail view should not navigate away from the dashboard unless necessary.
- Close action must be obvious.
- Mobile detail should use full-width panel.

### Telemetry Panel

Purpose: make the dashboard feel operational and give users a compact activity summary.

Entries can be static in MVP.

Example event types:

- Build pass
- Deploy ready
- Signal lost
- Anomaly
- Updated
- Local only

### Timeline Panel

Purpose: show project chronology or roadmap.

MVP can use manual data from project records.

Events should show:

- Date
- Project
- Event/status
- Optional short note

## Admin Dashboard Requirements

### Login

Fields:

- Email
- Password

States:

- Empty
- Loading
- Invalid credentials
- Authenticated redirect

### Admin Overview

Must include:

- Project count by status.
- Table or dense list of projects.
- Search by name/slug.
- Filter by status, category, public visibility, featured state.
- Create project button.

Project list columns:

- Sort order
- Name
- Status
- Category
- Public
- Featured
- Last updated
- Actions

Actions:

- Edit
- Duplicate optional
- Delete/archive
- Reorder

### Project Editor

Recommended layout:

- Left/main form for content.
- Right-side operational panel for visibility, status, sort order, and save actions.

Fields:

- Name
- Slug
- Summary
- Description
- Status
- Category
- GitHub URL
- Demo URL
- Tech stack list
- Is public
- Is featured
- Sort order
- Last updated at

Validation:

- Name required.
- Slug required and URL-safe.
- Summary required for public projects.
- GitHub URL must be valid URL if provided.
- Demo URL must be valid URL if provided.
- Tech stack should allow multiple values.

Save behavior:

- Clear dirty state indication.
- Save success confirmation.
- Save failure message with retry path.
- Unsaved changes warning before leaving.

### Admin Accounts

MVP can be minimal:

- List admins.
- Create admin.
- Update name/email/password.
- Disable or delete admin if supported.

## Data Model Assumptions

```txt
User
- id
- name
- email
- passwordHash
- role
- createdAt
- updatedAt

Project
- id
- name
- slug
- summary
- description
- status
- category
- githubUrl
- demoUrl
- techStack
- isPublic
- isFeatured
- sortOrder
- lastUpdatedAt
- createdAt
- updatedAt
```

Status enum:

```txt
PLANNING
BUILDING
LIVE
PAUSED
BLOCKED
ARCHIVED
```

Public UI may map these to display labels:

```txt
PLANNING -> REVIEW
PAUSED -> STALE
```

## Required States

Design these states for both public and admin surfaces where relevant:

- Loading
- Empty
- Error
- Unauthorized
- Saving
- Saved
- Delete confirmation
- Filtered empty
- Form validation error
- Mobile layout

## Responsive Behavior

Desktop:

- Command strip at top.
- Status rail or filter area.
- Project grid as primary center area.
- Telemetry on the side.
- Timeline below.

Mobile:

- Command strip remains sticky.
- Filters become horizontal chips.
- Project cards become single-column.
- Telemetry and timeline stack below projects.
- Admin project table may become list cards.

## Accessibility

Minimum requirements:

- Keyboard reachable filters, cards, links, and admin actions.
- Visible focus states.
- Buttons and links must have clear labels.
- Do not rely only on color for status.
- Error messages should be attached to form fields.
- Destructive actions require confirmation.

## Deliverables Expected From Claude Design

Produce:

- Public dashboard screen.
- Public project detail state.
- Public empty/error/loading states.
- Admin login screen.
- Admin project overview.
- Admin project editor.
- Admin delete confirmation.
- Mobile versions for public dashboard and admin editor.

Prioritize functional completeness and layout clarity. Visual styling should follow the existing Xenon Grid design system.
