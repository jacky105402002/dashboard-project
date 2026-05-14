# Zeabur Deployment Notes

The intended production target is Zeabur for both the API service and PostgreSQL database.

## Services

- Web: `apps/web`, Vite static build.
- API: `apps/api`, NestJS service.
- Database: Zeabur PostgreSQL.

## API Environment

Set these variables on the Zeabur API service:

```txt
DATABASE_URL=<Zeabur PostgreSQL connection string>
PORT=3000
CORS_ORIGIN=<production web URL>
```

The API exposes:

- `GET /health`
- `GET /projects/public`
- Swagger docs at `/docs`

## Database

The Prisma schema lives at:

```txt
apps/api/prisma/schema.prisma
```

Initial models:

- `User`
- `Project`

Before production launch, run:

```powershell
npm run prisma:deploy -w @dashboard/api
```

## Suggested Build Commands

Web:

```txt
npm install
npm run build -w @dashboard/web
```

API:

```txt
npm install
npm run prisma:generate -w @dashboard/api
npm run build -w @dashboard/api
npm run start -w @dashboard/api
```
