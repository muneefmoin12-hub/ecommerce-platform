import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { ProductsTable } from '@/components/products/ProductsTable';
import { adminApi } from '@/lib/admin-api';
import { ADMIN_MOCK_PRODUCTS } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'Products' };

export default async function ProductsPage() {
  const products = await adminApi.products
    .list({ limit: 50 })
    .catch(() => ({
      data: ADMIN_MOCK_PRODUCTS,
      meta: { total: ADMIN_MOCK_PRODUCTS.length, page: 1, limit: 50, totalPages: 1 },
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.meta.total} total products</p>
        </div>
        <Link
          href="/products/new"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold bg-primary text-white hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>
      <ProductsTable products={products.data} />
    </div>
  );
}
