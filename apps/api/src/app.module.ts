import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_GUARD } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CartModule } from './modules/cart/cart.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { RedisCacheModule } from './modules/cache/cache.module';
import { QueueModule } from './modules/queue/queue.module';
import { SearchModule } from './modules/search/search.module';
import { databaseConfig } from './config/database.config';
import { winstonConfig } from './logging/winston.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),

    WinstonModule.forRoot(winstonConfig),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('RATE_LIMIT_TTL', 60),
        limit: config.get('RATE_LIMIT_MAX', 100),
      }),
    }),

    EventEmitterModule.forRoot({ wildcard: false, maxListeners: 20 }),

    // Infrastructure modules
    RedisCacheModule,
    QueueModule,

    // Feature modules
    ProductsModule,
    OrdersModule,
    CartModule,
    AuthModule,
    UsersModule,
    PaymentsModule,
    InventoryModule,
    WebhooksModule,
    SearchModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
