import type { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa';

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve('logger');
  logger.info(`[order-placed] Order ${data.id} created — triggering post-purchase flow`);

  // In production: send confirmation email, notify fulfillment, update analytics
  // Example: const notificationService = container.resolve(Modules.NOTIFICATION)
  // await notificationService.createNotifications({ ... })
}

export const config: SubscriberConfig = {
  event: 'order.placed',
};
