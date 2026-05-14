# Dashboard Project

Personal project mission-control dashboard for displaying Jacky's projects in one place.

This project uses the AItogo development approach and is planned as an API-first TypeScript application:

- Public dashboard: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- Admin dashboard: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- API: NestJS + TypeScript + Swagger + Prisma
- Database: PostgreSQL
- MVP deployment target: Zeabur

## Product Scope

The application has two websites and one database-backed API.

- Public site: shows project status cards and links to GitHub and demo websites.
- Admin site: manages project showcase data.
- API/database: stores projects and admin accounts.

## Current Artifacts

- [design.md](design.md): mission-control visual design reference adapted from the Lift-off challenge style.
- [docs/progress.md](docs/progress.md): current planning progress and next steps.
- [docs/technical-decision-record.md](docs/technical-decision-record.md): initial AItogo architecture decision.
- [docs/deployment-zeabur.md](docs/deployment-zeabur.md): Zeabur deployment notes for the web, API, and PostgreSQL database.
- [docs/local-docker-development.md](docs/local-docker-development.md): local Docker setup for the API and PostgreSQL database.
- [docs/claude-design-uiux-ssd.md](docs/claude-design-uiux-ssd.md): UIUX SSD for Claude Design, focused on product structure and behavior.
- [docs/google-stitch-uiux-ssd.md](docs/google-stitch-uiux-ssd.md): UIUX SSD for Google Stitch, including visual and screen generation guidance.
- [docs/design-assets/claude-design/github-dashboard](docs/design-assets/claude-design/github-dashboard): Claude Design exported dashboard mockup source.
- [docs/design-assets/google-stitch/xenon-grid-mission-control](docs/design-assets/google-stitch/xenon-grid-mission-control): Google Stitch exported dashboard mockups and screenshots.

## Development

```powershell
npm install
npm run dev:web
npm run dev:api
```

The first implemented surface is `apps/web`, based on the Claude Design dashboard mockup.

To run API and PostgreSQL in Docker:

```powershell
docker compose up --build
```

