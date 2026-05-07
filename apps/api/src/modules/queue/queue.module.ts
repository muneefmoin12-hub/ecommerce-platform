import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueService } from './queue.service';
import { NotificationProcessor } from './processors/notification.processor';
import { OrderProcessor } from './processors/order.processor';

export const NOTIFICATION_QUEUE = 'notifications';
export const ORDER_QUEUE = 'orders';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get<number>('REDIS_PORT', 6379),
          password: config.get('REDIS_PASSWORD'),
        },
        defaultJobOptions: {
          attempts: 3,
          backoff: { type: 'exponential', delay: 2000 },
          removeOnComplete: 100,
          removeOnFail: 500,
        },
      }),
    }),
    BullModule.registerQueue(
      { name: NOTIFICATION_QUEUE },
      { name: ORDER_QUEUE },
    ),
  ],
  providers: [QueueService, NotificationProcessor, OrderProcessor],
  exports: [QueueService],
})
export class QueueModule {}
