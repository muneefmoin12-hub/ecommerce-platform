import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { NOTIFICATION_QUEUE } from '../queue.module';
import { type NotificationJob } from '../queue.service';

type NJob = NotificationJob & { type: string };

@Processor(NOTIFICATION_QUEUE)
export class NotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationProcessor.name);

  async process(job: Job<NJob>): Promise<void> {
    this.logger.log(`Processing notification job [${job.name}] for ${job.data.to}`);

    switch (job.name) {
      case 'order_confirmation':
        await this.sendOrderConfirmation(job.data);
        break;
      case 'shipping_update':
        await this.sendShippingUpdate(job.data);
        break;
      case 'password_reset':
        await this.sendPasswordReset(job.data);
        break;
      case 'welcome':
        await this.sendWelcome(job.data);
        break;
      default:
        this.logger.warn(`Unknown notification type: ${job.name}`);
    }
  }

  private async sendOrderConfirmation(data: NJob) {
    // In production: integrate SendGrid / Resend / Postmark
    this.logger.log(`[email] Order confirmation → ${data.to}`);
  }

  private async sendShippingUpdate(data: NJob) {
    this.logger.log(`[email] Shipping update → ${data.to}`);
  }

  private async sendPasswordReset(data: NJob) {
    this.logger.log(`[email] Password reset → ${data.to}`);
  }

  private async sendWelcome(data: NJob) {
    this.logger.log(`[email] Welcome email → ${data.to}`);
  }
}
