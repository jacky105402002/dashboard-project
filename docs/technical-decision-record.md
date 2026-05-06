# Technical Decision Record

## Project Name

Dashboard Project

## Date

2026-05-06

## Adopt AItogo

Yes.

## Project Type

- Personal side project
- API-first dashboard
- Project showcase platform
- Admin CRUD system

## Technology Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui

The public dashboard needs a highly customized visual direction based on `design.md`, so React is preferred over a generated admin or CMS-style frontend.

### Admin

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui

The admin dashboard should share the same frontend stack as the public site. This keeps the UI flexible and avoids locking the project into a prebuilt admin framework.

### Backend

- NestJS
- TypeScript
- Swagger/OpenAPI
- Prisma

NestJS is selected because this project should have a clear API contract shared by the public dashboard and admin dashboard. Swagger makes the API inspectable and easier to iterate with AI-assisted development.

### Database and Data Layer

- PostgreSQL
- Prisma

PostgreSQL is the primary database. Prisma is used as the TypeScript data layer for the NestJS API.

### Environment and Deployment

- Local development: Docker Compose
- MVP deployment: Zeabur
- Source control: GitHub
- CI/CD: GitHub Actions later in the project

## Reasons

- The project has two frontends that should use one clear API.
- The public dashboard needs a custom mission-control interface.
- The admin dashboard is simple CRUD, but still benefits from matching the frontend stack.
- NestJS + Swagger provides a clear API contract for AI-assisted development.
- Prisma gives a readable schema and type-safe data access.
- The MVP can stay simple while leaving room for future automation such as GitHub status sync or AI-generated project summaries.

## Rejected Alternatives

### Laravel + Filament

Rejected for this project because the admin dashboard should be custom React UI, and the public dashboard needs a highly tailored visual style. Filament would be faster for pure CRUD, but less aligned with the desired UI direction.

### FastAPI

Rejected for the MVP because there is no AI microservice, model orchestration, or data-processing pipeline yet. FastAPI can be added later if the project grows into automated GitHub analysis or AI-generated project summaries.

### Pure Static Site

Rejected because the project requires an admin dashboard and database-backed project management.

## Minimum Viable Architecture

```txt
dashboard-project/
  apps/
    web/        # Public dashboard
    admin/      # Admin dashboard
    api/        # NestJS API
  packages/
    shared/     # Shared types and constants, added when needed
  docs/
    progress.md
    technical-decision-record.md
  design.md
```

## Initial Data Model

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

## Project Status Enum

```txt
PLANNING
BUILDING
LIVE
PAUSED
BLOCKED
ARCHIVED
```

## Future Expansion

- GitHub API sync for repository metadata.
- Automated deploy/status checks.
- AI-generated project summaries.
- Activity timeline based on commits, builds, or manual admin events.
- Role-based admin access if more users are added.

## Risks and Notes

- Using custom React admin UI takes longer than a generated admin framework.
- The first version should avoid overbuilding shared packages.
- The API contract should be documented early through Swagger.
- Red visual states in the UI must remain reserved for critical action or failure states, as defined in `design.md`.

