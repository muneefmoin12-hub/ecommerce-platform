import type { Metadata } from 'next';
import { OrdersTable } from '@/components/orders/OrdersTable';
import { adminApi } from '@/lib/admin-api';
import { ADMIN_MOCK_ORDERS } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'Orders' };

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { status?: string; page?: string };
}) {
  const orders = await adminApi.orders
    .list({
      status: searchParams.status,
      page: searchParams.page ? Number(searchParams.page) : 1,
      limit: 20,
    })
    .catch(() => ({
      data: ADMIN_MOCK_ORDERS,
      meta: { total: ADMIN_MOCK_ORDERS.length, page: 1, limit: 20, totalPages: 1 },
    }));

  const statuses = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.meta.total} total orders</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {statuses.map((status) => (
          <a
            key={status}
            href={status === 'all' ? '/orders' : `/orders?status=${status}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
              (searchParams.status ?? 'all') === status
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-600'
            }`}
          >
            {status}
          </a>
        ))}
      </div>

      <OrdersTable orders={orders.data} meta={orders.meta} />
    </div>
  );
}
