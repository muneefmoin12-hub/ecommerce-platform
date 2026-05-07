import { apiClient } from '@/lib/api-client';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  categoryId?: string;
  excludeId: string;
}

export async function RelatedProducts({ categoryId, excludeId }: RelatedProductsProps) {
  const fallback = MOCK_PRODUCTS.filter(
    (p) => p.id !== excludeId && (!categoryId || p.categories.some((c) => c.id === categoryId)),
  ).slice(0, 4);

  const products = categoryId
    ? await apiClient.products
        .list({ categoryId, limit: 8 })
        .then((r) => r.data.filter((p) => p.id !== excludeId).slice(0, 4))
        .catch(() => fallback)
    : fallback;

  const displayed = products.length ? products : fallback;
  if (!displayed.length) return null;

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">You May Also Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {displayed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
