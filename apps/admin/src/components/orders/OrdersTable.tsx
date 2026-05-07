import Link from 'next/link';
import type { Order, PaginationMeta } from '@ecommerce/types';
import { formatCurrency, formatDate } from '@ecommerce/utils';
import { Badge } from '@ecommerce/ui';

interface OrdersTableProps {
  orders: Order[];
  meta: PaginationMeta;
}

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'outline'> = {
  delivered: 'success',
  cancelled: 'destructive',
  pending: 'warning',
  confirmed: 'default',
  processing: 'default',
  shipped: 'default',
};

export function OrdersTable({ orders, meta }: OrdersTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Order', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => {
              const displayId = order.displayId ?? `#${order.id.slice(0, 8)}`;
              const firstName = (order.shippingAddress as any)?.firstName ?? '';
              const lastName = (order.shippingAddress as any)?.lastName ?? '';
              return (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-900">{displayId}</td>
                  <td className="px-4 py-3 text-gray-700">{firstName} {lastName}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3 text-gray-600">{order.items.length}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{formatCurrency(order.total)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[order.status] ?? 'outline'} className="capitalize">
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/orders/${order.id}`} className="text-primary hover:underline text-xs font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
        <span>Showing {orders.length} of {meta.total} orders</span>
        <span className="text-gray-400">Page {meta.page} of {meta.totalPages}</span>
      </div>
    </div>
  );
}
