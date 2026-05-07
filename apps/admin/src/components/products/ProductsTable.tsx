'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@ecommerce/ui';
import type { Product } from '@ecommerce/types';
import { formatCurrency } from '@ecommerce/utils';

interface ProductsTableProps {
  products: Product[];
}

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'outline'> = {
  published: 'success',
  draft: 'warning',
  archived: 'destructive',
};

export function ProductsTable({ products }: ProductsTableProps) {
  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    toast.error('Delete functionality requires API integration');
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Product', 'SKU', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                      {product.images[0] && (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate max-w-[200px]">{product.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[200px]">{product.categories[0]?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{product.sku}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{formatCurrency(product.price)}</td>
                <td className="px-4 py-3">
                  <span className={`font-semibold text-sm ${product.inventoryQuantity === 0 ? 'text-red-600' : product.inventoryQuantity <= 10 ? 'text-amber-600' : 'text-gray-900'}`}>
                    {product.inventoryQuantity === 0 ? 'Out of stock' : product.inventoryQuantity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[product.status] ?? 'outline'} className="capitalize">
                    {product.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/products/${product.id}/edit`}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
        {products.length} products total
      </div>
    </div>
  );
}
