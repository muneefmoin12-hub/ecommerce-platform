import type { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa';

export default async function productUpdatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve('logger');
  logger.info(`[product-updated] Product ${data.id} changed — re-indexing in search`);

  // In production: push product delta to Meilisearch index via NestJS search API
  // fetch(`${process.env.NESTJS_API_URL}/api/search/index-product`, { method: 'POST', body: JSON.stringify({ id: data.id }) })
}

export const config: SubscriberConfig = {
  event: ['product.created', 'product.updated', 'product.deleted'],
};
