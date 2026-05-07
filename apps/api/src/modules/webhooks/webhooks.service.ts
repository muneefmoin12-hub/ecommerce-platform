import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly config: ConfigService,
  ) {}

  async handleMedusaWebhook(event: string, data: unknown): Promise<void> {
    this.logger.log(`Medusa webhook: ${event}`);
    this.eventEmitter.emit(`medusa.${event}`, data);
  }

  async handleSanityWebhook(body: unknown, signature: string): Promise<void> {
    // Verify Sanity webhook signature
    const secret = this.config.get<string>('SANITY_WEBHOOK_SECRET', '');
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (signature !== expectedSig) {
      this.logger.warn('Invalid Sanity webhook signature');
      throw new Error('Invalid signature');
    }

    this.logger.log('Sanity content updated — triggering ISR revalidation');
    this.eventEmitter.emit('sanity.content_updated', body);
  }
}
