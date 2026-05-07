import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ORDER_QUEUE } from '../queue.module';
import type { OrderJob } from '../queue.service';

@Processor(ORDER_QUEUE)
export class OrderProcessor extends WorkerHost {
  private readonly logger = new Logger(OrderProcessor.name);

  async process(job: Job<OrderJob>): Promise<void> {
    this.logger.log(`Processing order job [${job.name}] for order ${job.data.orderId}`);

    switch (job.name) {
      case 'process_payment':
        await this.handlePaymentProcessing(job.data);
        break;
      case 'trigger_fulfillment':
        await this.handleFulfillment(job.data);
        break;
      case 'sync_inventory':
        await this.handleInventorySync(job.data);
        break;
      default:
        this.logger.warn(`Unknown order job: ${job.name}`);
    }
  }

  private async handlePaymentProcessing(data: OrderJob) {
    this.logger.log(`Processing payment for order ${data.orderId}`);
    // Stripe payment intent capture / confirm
  }

  private async handleFulfillment(data: OrderJob) {
    this.logger.log(`Triggering fulfillment for order ${data.orderId}`);
    // Notify warehouse / 3PL system
  }

  private async handleInventorySync(data: OrderJob) {
    this.logger.log(`Syncing inventory after order ${data.orderId}`);
    // Update stock levels, trigger reorder alerts
  }
}
