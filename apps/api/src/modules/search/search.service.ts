import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MeiliSearch, type Index } from 'meilisearch';
import { ProductsService } from '../products/products.service';

const PRODUCTS_INDEX = 'products';

@Injectable()
export class SearchService implements OnModuleInit {
  private readonly logger = new Logger(SearchService.name);
  private readonly client: MeiliSearch;
  private productsIndex!: Index;

  constructor(
    private readonly config: ConfigService,
    private readonly productsService: ProductsService,
  ) {
    this.client = new MeiliSearch({
      host: this.config.get('MEILISEARCH_URL', 'http://localhost:7700'),
      apiKey: this.config.get('MEILISEARCH_API_KEY', 'masterKey'),
    });
  }

  async onModuleInit() {
    try {
      await this.client.createIndex(PRODUCTS_INDEX, { primaryKey: 'id' }).catch(() => {});
      this.productsIndex = this.client.index(PRODUCTS_INDEX);

      // Configure searchable attributes and filters
      await this.productsIndex.updateSettings({
        searchableAttributes: ['name', 'description', 'shortDescription', 'sku'],
        filterableAttributes: ['status', 'price', 'categories'],
        sortableAttributes: ['price', 'createdAt', 'name'],
        rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
      });

      this.logger.log('Meilisearch index configured');
    } catch (err) {
      this.logger.warn(`Meilisearch not available: ${(err as Error).message}`);
    }
  }

  async search(query: string, options: { page?: number; limit?: number; filter?: string } = {}) {
    const { page = 1, limit = 24, filter } = options;
    try {
      const result = await this.productsIndex.search(query, {
        offset: (page - 1) * limit,
        limit,
        filter,
        attributesToHighlight: ['name', 'description'],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
      });

      return {
        hits: result.hits,
        total: result.estimatedTotalHits ?? result.hits.length,
        page,
        limit,
        processingTimeMs: result.processingTimeMs,
      };
    } catch {
      // Fallback to DB search when Meilisearch unavailable
      this.logger.warn('Meilisearch unavailable — falling back to database search');
      const fallback = await this.productsService.findAll({ search: query, page, limit });
      return { hits: fallback.data, total: fallback.meta.total, page, limit, processingTimeMs: 0 };
    }
  }

  async indexProduct(product: Record<string, unknown>) {
    try {
      await this.productsIndex.addDocuments([product]);
    } catch (err) {
      this.logger.warn(`Failed to index product: ${(err as Error).message}`);
    }
  }

  async removeProduct(id: string) {
    try {
      await this.productsIndex.deleteDocument(id);
    } catch (err) {
      this.logger.warn(`Failed to remove product from index: ${(err as Error).message}`);
    }
  }

  async reindexAll() {
    this.logger.log('Starting full product re-index...');
    const { data } = await this.productsService.findAll({ limit: 10000 });
    await this.productsIndex.addDocuments(data as any[]);
    this.logger.log(`Re-indexed ${data.length} products`);
    return data.length;
  }
}
