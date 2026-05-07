import { defineConfig, Modules } from '@medusajs/framework/utils';

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.MEDUSA_DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS ?? 'http://localhost:3000',
      adminCors: process.env.ADMIN_CORS ?? 'http://localhost:3002',
      authCors: process.env.AUTH_CORS ?? 'http://localhost:3000,http://localhost:3002',
      jwtSecret: process.env.JWT_SECRET ?? 'supersecret-change-in-production',
      cookieSecret: process.env.COOKIE_SECRET ?? 'supersecret-change-in-production',
    },
  },

  modules: [
    // Event bus backed by Redis for distributed pub/sub
    {
      resolve: '@medusajs/event-bus-redis',
      options: {
        redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
      },
    },

    // Cache module backed by Redis
    {
      resolve: '@medusajs/cache-redis',
      options: {
        redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
        ttl: 30,
      },
    },

    // Stripe payment provider
    {
      resolve: '@medusajs/payment-stripe',
      options: {
        apiKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        capture: true,
      },
    },

    // Manual fulfillment for development / simple flows
    {
      resolve: '@medusajs/fulfillment-manual',
    },

    // Local file storage (swap for S3 in production)
    {
      resolve: '@medusajs/file-local',
      options: {
        upload_dir: 'uploads',
        backend_url: `${process.env.BACKEND_URL ?? 'http://localhost:9000'}/uploads`,
      },
    },

    // Local notification provider (swap for SendGrid / Resend in production)
    {
      resolve: '@medusajs/notification-local',
      options: {
        name: 'Local Notification Provider',
        channels: ['email'],
      },
    },
  ],
});
