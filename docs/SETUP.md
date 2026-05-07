# Development Setup Guide

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 20.0 | [nodejs.org](https://nodejs.org) |
| pnpm | ≥ 9.0 | `npm install -g pnpm@9` |
| Docker | ≥ 24.0 | [docker.com](https://docker.com) |
| Git | ≥ 2.40 | [git-scm.com](https://git-scm.com) |

## Step 1 — Clone & Install

```bash
git clone https://github.com/your-org/ecommerce-platform.git
cd ecommerce-platform
pnpm install
```

## Step 2 — Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in required values:

### Required for development:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — Min 32 character random string
- `REFRESH_TOKEN_SECRET` — Another 32+ char random string
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — From Sanity dashboard
- `STRIPE_SECRET_KEY` — From Stripe dashboard (use test keys)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — From Stripe dashboard

### Generate secrets:
```bash
# Unix/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

## Step 3 — Start Infrastructure

```bash
# Start PostgreSQL and Redis
docker-compose -f apps/api/docker-compose.yml up -d

# Verify they're running
docker ps
```

## Step 4 — Database Setup

```bash
# Run migrations
pnpm db:migrate

# Seed with sample data
pnpm db:seed
```

This creates:
- 4 product categories
- 12 sample products
- Admin user: `admin@yourstore.com` / `Admin@12345`

## Step 5 — Sanity CMS Setup

1. Create a Sanity account at [sanity.io](https://sanity.io)
2. Create a new project
3. Copy the Project ID and API Token
4. Add them to `.env.local`

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Initialize Sanity studio in the cms directory
sanity init
```

## Step 6 — Start Development Servers

```bash
pnpm dev
```

This starts all apps concurrently via Turborepo:

| App | URL |
|-----|-----|
| Storefront | http://localhost:3000 |
| API | http://localhost:3001 |
| API Docs | http://localhost:3001/api/docs |
| Admin | http://localhost:3002 |

## Step 7 — Stripe Test Setup

1. Install Stripe CLI: [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login: `stripe login`
3. Forward webhooks:
```bash
stripe listen --forward-to http://localhost:3001/api/v1/payments/webhook
```

Use test card: `4242 4242 4242 4242` (any future date, any CVC)

## Common Commands

```bash
# Run all tests
pnpm test

# Run API tests only
pnpm test --filter=@ecommerce/api

# Type check all
pnpm type-check

# Lint all
pnpm lint

# Build all for production
pnpm build

# Generate a new migration
cd apps/api && pnpm migration:generate --name=AddNewColumn

# Stop infrastructure
docker-compose -f apps/api/docker-compose.yml down
```

## VS Code Extensions (Recommended)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript + JavaScript
- Docker
- REST Client (for testing API)

## Troubleshooting

**Port already in use:**
```bash
# Find and kill process on port 3001
npx kill-port 3001
```

**Database connection failed:**
```bash
# Check PostgreSQL is running
docker ps | grep postgres
# Restart if needed
docker-compose -f apps/api/docker-compose.yml restart postgres
```

**pnpm install fails:**
```bash
# Clear cache and retry
pnpm store prune
pnpm install
```
