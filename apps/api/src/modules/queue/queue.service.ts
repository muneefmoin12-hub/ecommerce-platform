import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { NOTIFICATION_QUEUE, ORDER_QUEUE } from './queue.module';

export interface NotificationJob {
  type: 'order_confirmation' | 'shipping_update' | 'password_reset' | 'welcome';
  to: string;
  data: Record<string, unknown>;
}

export interface OrderJob {
  type: 'process_payment' | 'trigger_fulfillment' | 'sync_inventory';
  orderId: string;
  data?: Record<string, unknown>;
}

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(NOTIFICATION_QUEUE) private readonly notificationQueue: Queue,
    @InjectQueue(ORDER_QUEUE) private readonly orderQueue: Queue,
  ) {}

  async sendNotification(job: NotificationJob, delayMs = 0) {
    return this.notificationQueue.add(job.type, job, { delay: delayMs });
  }

  async processOrder(job: OrderJob, priority = 0) {
    return this.orderQueue.add(job.type, job, { priority });
  }

  async getQueueStats() {
    const [notifCounts, orderCounts] = await Promise.all([
      this.notificationQueue.getJobCounts(),
      this.orderQueue.getJobCounts(),
    ]);
    return { notifications: notifCounts, orders: orderCounts };
  }
}
