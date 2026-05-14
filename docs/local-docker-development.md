# Local Docker Development

Use Docker locally to run the API and PostgreSQL before moving the same API/database shape to Zeabur.

## Services

`docker-compose.yml` starts:

- `db`: PostgreSQL 16
- `api`: NestJS API on port `3000`

The web app can stay outside Docker during development:

```powershell
npm run dev:web
```

This keeps frontend hot reload fast while the API and database behave like deployable services.

## Start API + DB

```powershell
docker compose up --build
```

The API container runs:

```txt
npm run prisma:push -w @dashboard/api
npm run start:dev -w @dashboard/api
```

`prisma db push` is used for early local development so the database schema is created automatically from `apps/api/prisma/schema.prisma`.

## URLs

- API health: `http://localhost:3000/health`
- Public projects API: `http://localhost:3000/projects/public`
- Swagger docs: `http://localhost:3000/docs`
- PostgreSQL: `localhost:5432`

Local database credentials:

```txt
POSTGRES_USER=dashboard
POSTGRES_PASSWORD=dashboard
POSTGRES_DB=dashboard_dev
DATABASE_URL=postgresql://dashboard:dashboard@localhost:5432/dashboard_dev?schema=public
```

Inside Docker, the API uses:

```txt
DATABASE_URL=postgresql://dashboard:dashboard@db:5432/dashboard_dev?schema=public
```

## Common Commands

Start in the foreground:

```powershell
docker compose up --build
```

Start in the background:

```powershell
docker compose up --build -d
```

Stop containers:

```powershell
docker compose down
```

Stop and delete the local database volume:

```powershell
docker compose down -v
```

View logs:

```powershell
docker compose logs -f api
docker compose logs -f db
```

Run Prisma commands against the Docker database:

```powershell
docker compose exec api npm run prisma:push -w @dashboard/api
docker compose exec api npm run prisma:generate -w @dashboard/api
```

## Zeabur Migration Path

Local Docker:

```txt
API container -> db:5432 -> Docker PostgreSQL
```

Zeabur:

```txt
API service -> DATABASE_URL -> Zeabur PostgreSQL
```

The API code does not need to change. Only the environment variables change.

For production, prefer migrations:

```powershell
npm run prisma:migrate -w @dashboard/api
npm run prisma:deploy -w @dashboard/api
```

During early development, `prisma db push` is acceptable because the schema is still moving quickly.
