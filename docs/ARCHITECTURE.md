# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTS                                  │
│              Browser │ Mobile (future) │ Admin                   │
└─────────────────┬──────────────────────────┬────────────────────┘
                  │                          │
┌─────────────────▼──────────────────────────▼────────────────────┐
│                        NGINX (Reverse Proxy)                     │
│            SSL Termination │ Rate Limiting │ Gzip                │
└──────────┬─────────────────────────────────┬────────────────────┘
           │                                 │
┌──────────▼────────┐              ┌─────────▼──────────┐
│  Next.js Web App  │              │ Next.js Admin App  │
│   (port 3000)     │              │    (port 3002)     │
│  ISR / SSR / RSC  │              │   Dashboard UI     │
└──────────┬────────┘              └─────────┬──────────┘
           │                                 │
           └──────────────┬──────────────────┘
                          │ REST API
           ┌──────────────▼────────────────────────┐
           │         NestJS API (port 3001)          │
           │  Products │ Orders │ Auth │ Payments    │
           │  Cart │ Users │ Inventory │ Webhooks    │
           └──────┬─────────────────────────────────┘
                  │
    ┌─────────────┼─────────────────────────────┐
    │             │                             │
┌───▼───┐   ┌────▼────┐   ┌──────────┐   ┌────▼────┐
│  PG   │   │  Redis  │   │ Sanity   │   │ Stripe  │
│ (DB)  │   │ (Cache) │   │  (CMS)   │   │ (Pay.)  │
└───────┘   └─────────┘   └──────────┘   └─────────┘
```

## Key Design Decisions

### 1. Monorepo with Turborepo
- Single repository for all apps and packages
- Shared TypeScript types across all apps
- Cached builds for faster CI/CD
- Easy cross-package refactoring

### 2. Server Components First
- Next.js App Router with React Server Components by default
- Client components only where interactivity is needed
- ISR (Incremental Static Regeneration) for product pages
- Reduces JavaScript bundle sent to client

### 3. Headless Architecture
- NestJS API is the single source of truth
- Frontend is completely decoupled
- Supports future mobile apps without API changes
- Admin uses same API as storefront

### 4. Event-Driven Design
- NestJS EventEmitter for internal events
- Decoupled business logic (order created → send email, update inventory)
- Ready to upgrade to RabbitMQ/Kafka for microservices

### 5. Repository Pattern
- Abstraction over TypeORM for easier testing and swapping
- Service layer contains business logic, not controllers
- Controllers handle HTTP concerns only

## Module Responsibilities

| Module | Responsibility |
|--------|---------------|
| `products` | Product CRUD, catalog, search, categories |
| `orders` | Order lifecycle, status management |
| `cart` | Session/user cart management |
| `auth` | JWT authentication, refresh tokens |
| `users` | User profiles, addresses, preferences |
| `payments` | Stripe integration, webhooks |
| `inventory` | Stock tracking, low-stock alerts |
| `webhooks` | External event handlers (Medusa, Sanity) |

## Data Flow: Checkout

```
1. Customer adds to cart (zustand store + API sync)
2. Customer proceeds to checkout (address form)
3. Create Stripe payment intent (POST /payments/create-intent)
4. Stripe processes payment
5. Stripe sends webhook (POST /payments/webhook)
6. API confirms order, updates status
7. Order listener fires → send confirmation email
8. Inventory listener fires → decrement stock
9. Customer redirected to order confirmation page
```

## Caching Strategy

| Data | TTL | Method |
|------|-----|--------|
| Products list | 5 min | Redis + ISR |
| Product detail | 10 min | Redis + ISR |
| Homepage content | 1 min | ISR (revalidateTag) |
| Cart | Session | zustand persist |
| User session | 7 days | JWT |

## Security Layers

1. **HTTPS** — Enforced at Nginx level
2. **JWT Authentication** — Short-lived access tokens (7d) + refresh tokens (30d)
3. **RBAC** — Role-based access (customer, admin, super_admin)
4. **Throttling** — Rate limiting per IP (ThrottlerGuard)
5. **Validation** — Input validation on all DTOs (class-validator)
6. **SQL Injection** — Prevented by TypeORM parameterized queries
7. **XSS** — CSP headers + React's built-in escaping
8. **CSRF** — SameSite cookies + JWT in Authorization header

## Scaling Path

**Phase 1 (current):** Monolith API + shared PostgreSQL
**Phase 2:** Extract payments and inventory into microservices
**Phase 3:** Event streaming with Kafka, separate read/write databases
**Phase 4:** Multi-region with global CDN and regional PostgreSQL replicas
