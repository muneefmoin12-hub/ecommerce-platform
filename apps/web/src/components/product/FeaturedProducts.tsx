import { apiClient } from '@/lib/api-client';
import { ProductCard } from './ProductCard';
import type { Product } from '@ecommerce/types';

const FALLBACK_PRODUCTS: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: `demo-${i}`,
  medusaId: null,
  sku: `SKU-00${i + 1}`,
  name: ['Merino Wool Sweater', 'Leather Tote Bag', 'Running Sneakers', 'Silk Scarf', 'Ceramic Mug Set', 'Linen Trousers', 'Canvas Backpack', 'Gold Hoop Earrings'][i % 8]!,
  slug: `product-${i}`,
  description: 'A beautifully crafted premium product.',
  shortDescription: 'Premium quality, great value.',
  price: Math.round((29.99 + i * 15) * 100),
  compareAtPrice: i % 3 === 0 ? Math.round((49.99 + i * 15) * 100) : undefined,
  currency: 'USD',
  images: [{ id: `img-${i}`, url: `https://picsum.photos/seed/${i + 10}/600/600`, altText: `Product ${i + 1}`, position: 0 }],
  variants: [{ id: `var-${i}`, sku: `SKU-00${i + 1}-DEFAULT`, title: 'Default', price: Math.round((29.99 + i * 15) * 100), compareAtPrice: undefined, inventoryQuantity: 25, options: {}, images: [], weight: undefined, weightUnit: undefined }],
  categories: [{ id: `cat-${i % 4}`, name: ['Apparel', 'Accessories', 'Home', 'Electronics'][i % 4]!, slug: ['apparel', 'accessories', 'home', 'electronics'][i % 4]! }],
  tags: i % 2 === 0 ? ['new'] : ['featured'],
  status: 'published',
  inventoryQuantity: 25,
  metadata: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export async function FeaturedProducts() {
  const products = await apiClient.products
    .list({ limit: 8, sortBy: 'createdAt', sortOrder: 'desc' })
    .catch(() => ({ data: FALLBACK_PRODUCTS }));

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">New Arrivals</h2>
        <a href="/products" className="text-sm text-primary hover:underline">View all</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
