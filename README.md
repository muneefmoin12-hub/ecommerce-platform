# Enterprise E-Commerce Platform

A production-grade, scalable e-commerce platform built with a modern tech stack and clean architecture.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router, ISR, Server Components) |
| Backend | NestJS (Modular, Microservices-ready) |
| Commerce | Medusa.js (Headless commerce engine) |
| CMS | Sanity.io (Structured content, GROQ) |
| Database | PostgreSQL + TypeORM |
| Cache | Redis |
| Payments | Stripe |
| Monorepo | pnpm workspaces + Turborepo |

## Project Structure

```
ecommerce-platform/
├── apps/
│   ├── web/          # Next.js storefront (port 3000)
│   ├── api/          # NestJS backend API (port 3001)
│   └── admin/        # Admin dashboard (port 3002)
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── ui/           # Shared UI component library
│   └── utils/        # Shared utilities
├── infrastructure/   # Docker, K8s, Terraform, CI/CD
└── docs/             # Architecture & API docs
```

## Quick Start

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- Docker & Docker Compose
- PostgreSQL 15+

### Setup

```bash
# 1. Clone and install dependencies
pnpm install

# 2. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Start infrastructure (PostgreSQL, Redis)
docker-compose -f apps/api/docker-compose.yml up -d

# 4. Run database migrations
pnpm db:migrate

# 5. Seed database with sample data
pnpm db:seed

# 6. Start all apps in development mode
pnpm dev
```

### Development URLs

| Service | URL |
|---------|-----|
| Storefront | http://localhost:3000 |
| API | http://localhost:3001 |
| Admin | http://localhost:3002 |
| API Docs | http://localhost:3001/api/docs |
| Medusa Admin | http://localhost:7001 |

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full architecture overview.

## API Documentation

See [docs/API.md](docs/API.md) or visit `/api/docs` (Swagger UI) when running locally.

## Database

See [docs/DATABASE.md](docs/DATABASE.md) for schema design and migration guide.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for production deployment instructions.

## Development

### Running Tests

```bash
pnpm test              # all tests
pnpm test --filter=api # API tests only
```

### Linting & Formatting

```bash
pnpm lint
pnpm format
```

### Type Checking

```bash
pnpm type-check
```

## License

Private — All rights reserved.
