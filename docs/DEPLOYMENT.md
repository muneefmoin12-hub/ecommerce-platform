# Deployment Guide

## Environments

| Environment | Branch | URL |
|-------------|--------|-----|
| Development | `develop` | localhost |
| Staging | `develop` (auto) | staging.yourstore.com |
| Production | `main` (auto) | yourstore.com |

## Docker Compose (Simple Production)

For small deployments, use Docker Compose on a single server:

```yaml
# docker-compose.prod.yml
version: '3.9'
services:
  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./infrastructure/nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./ssl:/etc/ssl
    depends_on: [web, api, admin]

  web:
    image: ghcr.io/your-org/ecommerce/web:latest
    env_file: .env.production

  api:
    image: ghcr.io/your-org/ecommerce/api:latest
    env_file: .env.production

  admin:
    image: ghcr.io/your-org/ecommerce/admin:latest
    env_file: .env.production

  postgres:
    image: postgres:16-alpine
    env_file: .env.production
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

```bash
# Deploy
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml exec api pnpm migration:run
```

## Kubernetes (Scalable Production)

For high-traffic deployments, use the Kubernetes manifests in `infrastructure/kubernetes/`:

```bash
# Apply all manifests
kubectl apply -f infrastructure/kubernetes/

# Check rollout status
kubectl rollout status deployment/ecommerce-api -n production

# Scale the API horizontally
kubectl scale deployment ecommerce-api --replicas=5 -n production
```

## Environment Variables for Production

Create `.env.production` with production values:

```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:password@rds-endpoint.us-east-1.rds.amazonaws.com:5432/ecommerce?ssl=true
DATABASE_SSL=true
JWT_SECRET=<generated-64-char-random-string>
REFRESH_TOKEN_SECRET=<generated-64-char-random-string>
STRIPE_SECRET_KEY=sk_live_xxx
# ... all other production values
```

## CI/CD Pipeline

The GitHub Actions workflows handle:

1. **On every PR:**
   - Lint & type-check
   - Run tests
   - Build all apps

2. **On merge to main:**
   - All PR checks
   - Build Docker images
   - Push to GitHub Container Registry
   - Deploy to staging (auto)
   - Deploy to production (manual approval gate)

## SSL Certificate Setup

### Using Let's Encrypt (Certbot):
```bash
sudo certbot certonly --webroot \
  -w /var/www/certbot \
  -d yourstore.com \
  -d www.yourstore.com \
  -d admin.yourstore.com
```

### Configure auto-renewal:
```bash
echo "0 0 * * * certbot renew --quiet && nginx -s reload" | sudo crontab -
```

## Zero-Downtime Deployments

Docker Compose with rolling updates:
```bash
# Pull new image without downtime
docker-compose pull api
docker-compose up -d --no-deps api
```

Kubernetes rolling update (automatic by default):
```bash
kubectl set image deployment/ecommerce-api api=ghcr.io/your-org/ecommerce/api:v1.2.0 -n production
```

## Monitoring & Alerts

### Recommended tools:
- **Uptime:** UptimeRobot (free) or Pingdom
- **Logs:** Papertrail, Logtail, or Datadog
- **Metrics:** Prometheus + Grafana
- **Errors:** Sentry (install `@sentry/nextjs` and `@sentry/node`)

### Health check endpoints:
- API: `GET /api/v1/health`
- Web: `GET /` (returns 200)

## Rollback Procedure

```bash
# Docker Compose rollback
docker-compose pull api:previous-tag
docker-compose up -d --no-deps api

# Kubernetes rollback
kubectl rollout undo deployment/ecommerce-api -n production

# Database rollback
cd apps/api && pnpm migration:revert
```

## Checklist Before Production Launch

- [ ] Environment variables configured (no defaults from .env.example)
- [ ] Database migrations run successfully
- [ ] SSL certificates installed and auto-renewing
- [ ] Stripe webhook endpoint registered in Stripe Dashboard
- [ ] Sanity webhook endpoint configured
- [ ] Rate limiting enabled in Nginx
- [ ] Admin dashboard protected (IP restriction or VPN)
- [ ] Error monitoring (Sentry) configured
- [ ] Automated database backups scheduled
- [ ] CDN configured for static assets
- [ ] DNS records pointing to correct servers
- [ ] Load testing completed
- [ ] Smoke tests passing on production
