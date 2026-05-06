# Progress

## 2026-05-06

### Completed

- Reviewed the Refero `Lift-off challenge` style reference and extracted the design direction.
- Created `design.md` for this project, adapting the aircraft control panel aesthetic into a project mission-control dashboard.
- Reviewed Jacky's AItogo development approach from `jacky105402002/AItogo`.
- Confirmed this project should use AItogo.
- Chose an API-first TypeScript architecture instead of Laravel/Filament.

### Product Direction

This project is a simple portfolio/status dashboard for Jacky's own projects.

It will show projects that currently live in two main places:

- GitHub repository URL
- Public demo/showcase website URL

The product has two separate web experiences:

- Public dashboard for viewing project status and opening project links.
- Admin dashboard for editing project showcase data.

### Planned MVP Features

Public dashboard:

- Show all public projects.
- Show project status, summary, category, technology stack, GitHub URL, and demo URL.
- Allow users to open GitHub or demo links from each project card.
- Support simple status/category filtering.
- Support featured projects and custom sort order.

Admin dashboard:

- Admin login/logout.
- Create, update, delete, and reorder projects.
- Manage project status, category, summary, description, links, tech stack, public visibility, and featured state.
- Manage admin accounts.

API:

- Auth API for admin users.
- Project CRUD API for admin dashboard.
- Public project read API for the dashboard.
- Swagger/OpenAPI documentation.

Database:

- `users`
- `projects`

### Next Steps

1. Scaffold the monorepo.
2. Create `apps/web`, `apps/admin`, and `apps/api`.
3. Add shared TypeScript conventions and environment examples.
4. Define Prisma schema for `User` and `Project`.
5. Implement NestJS Swagger bootstrap.
6. Build the first public dashboard screen using `design.md`.
7. Build admin CRUD screens.
8. Prepare Zeabur deployment configuration.

