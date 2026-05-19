# Admin Authentication Plan

## Goal

Protect the admin console so only the site owner can create, edit, delete, and sync project records. The public portfolio dashboard remains readable without login.

The first version should support a single owner/admin account:

- First visit: allow creating the initial admin account.
- After one account exists: disable public registration.
- Returning visits: require login before showing the admin UI.
- API protection: admin-only endpoints must reject unauthenticated requests.

## Security Principles

- Never store plaintext passwords.
- Store passwords as one-way password hashes.
- Prefer a slow password hashing algorithm. For this Node/NestJS app, use `bcrypt` with cost `12` for the first implementation.
- Do not store auth tokens in `localStorage` or `sessionStorage`.
- Use an `HttpOnly`, `Secure`, `SameSite` cookie for the login token in production.
- Keep the JWT secret outside Git, configured through Zeabur environment variables.
- Keep public read endpoints available for the portfolio frontend.

## Existing Database Fit

The Prisma schema already has a `User` table:

```prisma
model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  role         UserRole @default(ADMIN)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

This table can be used for the initial admin account. No plaintext password field should be added.

## Auth Flow

### First Registration

`POST /auth/register`

Behavior:

1. Count users.
2. If count is `0`, allow registration.
3. Hash password with bcrypt.
4. Create the first `ADMIN` user.
5. Return safe user data only.
6. If count is greater than `0`, reject with `403 Forbidden`.

Required fields:

- `name`
- `email`
- `password`

Password validation:

- Minimum 12 characters.
- Maximum 72 bytes if using bcrypt.
- Require at least one letter and one number for the first version.

### Login

`POST /auth/login`

Behavior:

1. Find user by email.
2. Compare password with `passwordHash`.
3. If valid, issue a JWT.
4. Set JWT in an `HttpOnly` cookie.
5. Return safe user data.

Cookie options:

```ts
{
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * 7
}
```

Use `sameSite: 'none'` because the admin app and API are on different Zeabur subdomains:

- `https://jacky-dashboard-admin.zeabur.app`
- `https://jacky-dashboard-api.zeabur.app`

For local development, allow less strict settings through environment variables.

### Current User

`GET /auth/me`

Behavior:

- If the auth cookie is valid, return safe user data.
- If missing or invalid, return `401 Unauthorized`.

### Logout

`POST /auth/logout`

Behavior:

- Clear the auth cookie.
- Return `{ ok: true }`.

## Protected API Routes

These routes must require login:

```txt
GET    /projects
POST   /projects
PATCH  /projects/:id
DELETE /projects/:id
POST   /projects/:id/sync-github
```

These routes stay public:

```txt
GET /health
GET /projects/public
POST /auth/register
POST /auth/login
POST /auth/logout
GET /auth/me
```

Note: `POST /auth/register` is public only before the first user exists.

## Backend Implementation Plan

Add dependencies:

```txt
bcrypt
@types/bcrypt
@nestjs/jwt
cookie-parser
@types/cookie-parser
```

New API files:

```txt
apps/api/src/auth/auth.module.ts
apps/api/src/auth/auth.controller.ts
apps/api/src/auth/auth.service.ts
apps/api/src/auth/auth.dto.ts
apps/api/src/auth/auth.guard.ts
apps/api/src/auth/current-user.decorator.ts
```

Update existing files:

```txt
apps/api/src/app.module.ts
apps/api/src/main.ts
apps/api/src/projects.controller.ts
apps/api/prisma/schema.prisma
```

Expected backend changes:

- Register `cookie-parser` in `main.ts`.
- Enable CORS credentials:

```ts
app.enableCors({
  origin: allowedOrigins,
  credentials: true,
});
```

- Add `AuthGuard` to protected project routes.
- Ensure controller responses never return `passwordHash`.

## Admin Frontend Plan

Update admin API client:

```ts
fetch(url, {
  credentials: 'include',
  ...
})
```

New admin states:

- Loading auth state.
- First admin registration.
- Login.
- Authenticated admin console.

Admin startup flow:

1. Call `GET /auth/me`.
2. If authenticated, render project editor.
3. If `401`, show login.
4. If login fails because no owner exists, show first registration.

Recommended endpoints for UI:

```txt
GET  /auth/setup-status
POST /auth/register
POST /auth/login
POST /auth/logout
GET  /auth/me
```

`GET /auth/setup-status` can return:

```json
{
  "hasAdmin": true
}
```

This avoids guessing whether the admin needs registration or login.

## Zeabur Environment Variables

API service:

```env
CORS_ORIGIN=https://jacky-dashboard.zeabur.app,https://jacky-dashboard-admin.zeabur.app
DATABASE_URL=postgresql://...
JWT_SECRET=<generate-a-long-random-secret>
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
PORT=8080
ZBPACK_DOCKERFILE_PATH=apps/api/Dockerfile
```

Admin service:

```env
VITE_API_URL=https://jacky-dashboard-api.zeabur.app
ZBPACK_DOCKERFILE_PATH=apps/admin/Dockerfile
```

Web service:

```env
VITE_API_URL=https://jacky-dashboard-api.zeabur.app
ZBPACK_DOCKERFILE_PATH=apps/web/Dockerfile
```

## Local Development Environment

Local API may use:

```env
CORS_ORIGIN=http://localhost:5174,http://localhost:5175
JWT_SECRET=local-dev-only-change-in-production
COOKIE_SECURE=false
COOKIE_SAME_SITE=lax
PORT=3000
```

## Verification Checklist

- Fresh DB with no users shows first registration in admin.
- Register creates one admin user with a non-plaintext `passwordHash`.
- Second registration attempt is rejected.
- Login succeeds with the correct password.
- Login fails with the wrong password.
- Logged-out admin cannot fetch `/projects`.
- Logged-in admin can fetch, create, update, delete, and sync projects.
- Public frontend can still fetch `/projects/public` without login.
- Browser DevTools shows no auth token in localStorage/sessionStorage.
- Production cookie is `HttpOnly`, `Secure`, and `SameSite=None`.

## Implementation Order

1. Add backend auth dependencies and cookie/JWT setup.
2. Add auth module, controller, service, DTOs, and guard.
3. Protect project admin endpoints.
4. Add admin frontend login/register/logout flow.
5. Test locally with Docker.
6. Push to GitHub.
7. Add Zeabur `JWT_SECRET` and cookie env vars.
8. Redeploy API and admin services.
9. Create the first admin account in production.

