import Link from 'next/link';
import Image from 'next/image';
import type { Order } from '@ecommerce/types';
import { Badge } from '@ecommerce/ui';
import { formatCurrency, formatDate } from '@ecommerce/utils';

interface OrderListProps {
  orders: Order[];
}

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'outline'> = {
  delivered: 'success',
  cancelled: 'destructive',
  pending: 'warning',
  processing: 'default',
  shipped: 'default',
  refunded: 'outline',
};

const statusLabel: Record<string, string> = {
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  refunded: 'Refunded',
};

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-16 border rounded-xl">
        <p className="text-muted-foreground text-lg mb-2">No orders yet</p>
        <p className="text-sm text-muted-foreground mb-4">Your order history will appear here.</p>
        <Link href="/products" className="text-sm text-primary hover:underline font-medium">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
        >
          {/* Order header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 sm:px-6 py-4 bg-muted/30 border-b">
            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4">
              <p className="font-semibold text-sm">{order.displayId ?? `#${order.id.slice(0, 8)}`}</p>
              <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={statusVariant[order.status] ?? 'outline'} className="capitalize text-xs">
                {statusLabel[order.status] ?? order.status}
              </Badge>
              <span className="font-semibold text-sm">{formatCurrency(order.total)}</span>
            </div>
          </div>

          {/* Order items */}
          <div className="px-4 sm:px-6 py-4">
            <div className="space-y-3">
              {order.items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  {item.thumbnail && (
                    <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-md overflow-hidden bg-muted">
                      <Image src={item.thumbnail} alt={item.title} fill className="object-cover" sizes="56px" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.variantTitle} × {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium shrink-0">{formatCurrency(item.totalPrice)}</p>
                </div>
              ))}
              {order.items.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{order.items.length - 3} more item{order.items.length - 3 !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {order.currency}
              </div>
              <Link
                href={`/account/orders/${order.id}`}
                className="text-xs text-primary hover:underline font-medium"
              >
                View details →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
