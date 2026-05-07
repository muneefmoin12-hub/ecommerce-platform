import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly ordersService: OrdersService,
  ) {
    this.stripe = new Stripe(config.get<string>('STRIPE_SECRET_KEY', ''), {
      apiVersion: '2024-04-10',
    });
  }

  async createPaymentIntent(orderId: string, amount: number, currency = 'usd') {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { orderId },
    });
    return { clientSecret: paymentIntent.client_secret };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET', '');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      this.logger.error(`Stripe webhook signature verification failed: ${(err as Error).message}`);
      throw new Error('Invalid webhook signature');
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      default:
        this.logger.debug(`Unhandled Stripe event: ${event.type}`);
    }
  }

  private async handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    const orderId = paymentIntent.metadata['orderId'];
    if (orderId) {
      await this.ordersService.updateStatus(orderId, 'confirmed');
      this.logger.log(`Order ${orderId} confirmed after payment`);
    }
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    const orderId = paymentIntent.metadata['orderId'];
    if (orderId) {
      await this.ordersService.updateStatus(orderId, 'cancelled');
      this.logger.log(`Order ${orderId} cancelled after payment failure`);
    }
  }

  async createRefund(paymentIntentId: string, amount?: number) {
    return this.stripe.refunds.create({
      payment_intent: paymentIntentId,
      ...(amount !== undefined && { amount: Math.round(amount * 100) }),
    });
  }
}
