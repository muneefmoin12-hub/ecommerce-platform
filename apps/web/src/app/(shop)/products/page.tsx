import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { apiClient } from '@/lib/api-client';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import type { ProductsQuery } from '@ecommerce/types';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our complete curated collection of premium products.',
};

const EMPTY_META = {
  total: MOCK_PRODUCTS.length,
  page: 1,
  limit: 24,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

interface ProductsPageProps {
  searchParams: {
    page?: string;
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const query: ProductsQuery = {
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: 24,
    search: searchParams.search,
    categoryId: searchParams.category,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sortBy: searchParams.sortBy ?? 'createdAt',
    sortOrder: (searchParams.sortOrder as 'asc' | 'desc') ?? 'desc',
  };

  const products = await apiClient.products.list(query).catch(() => ({
    data: MOCK_PRODUCTS,
    meta: EMPTY_META,
  }));

  // Client-side filter on fallback data when searchParams are set
  let filteredData = products.data;
  if (!products.data.length || products.data === MOCK_PRODUCTS) {
    if (searchParams.search) {
      const q = searchParams.search.toLowerCase();
      filteredData = MOCK_PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }
    if (searchParams.category) {
      filteredData = filteredData.filter((p) =>
        p.categories.some((c) => c.id === searchParams.category || c.slug === searchParams.category),
      );
    }
  }

  const finalMeta = { ...EMPTY_META, total: filteredData.length };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">All Products</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          {finalMeta.total} products in our collection
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Filters sidebar */}
        <aside className="w-full md:w-56 lg:w-64 shrink-0">
          <ProductFilters />
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <Suspense
            fallback={
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            }
          >
            <ProductGrid products={filteredData} meta={finalMeta} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
