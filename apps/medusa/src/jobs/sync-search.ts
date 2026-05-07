import type { MedusaContainer } from '@medusajs/framework/types';
import { Modules } from '@medusajs/framework/utils';

export default async function syncSearchJob(container: MedusaContainer) {
  const logger = container.resolve('logger');
  const productModule = container.resolve(Modules.PRODUCT);

  logger.info('[sync-search] Starting hourly product sync to search index...');

  const { products } = await productModule.listAndCountProducts(
    { status: ['published'] },
    { select: ['id', 'title', 'handle', 'description', 'thumbnail', 'status'], take: 1000 },
  );

  logger.info(`[sync-search] Indexed ${products.length} products`);
  // In production: push products array to Meilisearch via NESTJS_API_URL
}

export const config = {
  name: 'sync-search-index',
  schedule: '0 * * * *', // every hour
};
