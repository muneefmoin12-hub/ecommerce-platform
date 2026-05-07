import type { Metadata } from 'next';
import { apiClient } from '@/lib/api-client';
import { MOCK_ORDERS } from '@/lib/mock-data';
import { OrderList } from '@/components/account/OrderList';

export const metadata: Metadata = {
  title: 'My Orders',
  robots: { index: false },
};

export default async function OrdersPage() {
  const orders = await apiClient.orders
    .list({ limit: 20 })
    .then((r) => r.data)
    .catch(() => MOCK_ORDERS);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">{orders.length} orders</p>
      </div>
      <OrderList orders={orders} />
    </div>
  );
}
