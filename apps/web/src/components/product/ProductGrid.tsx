import type { Product, PaginationMeta } from '@ecommerce/types';
import { ProductCard } from './ProductCard';
import { Pagination } from '@/components/ui/Pagination';

interface ProductGridProps {
  products: Product[];
  meta: PaginationMeta;
}

export function ProductGrid({ products, meta }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No products found</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        {meta.total} product{meta.total !== 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {meta.totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination currentPage={meta.page} totalPages={meta.totalPages} />
        </div>
      )}
    </div>
  );
}
