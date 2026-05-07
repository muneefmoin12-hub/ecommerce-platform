'use client';

import Image from 'next/image';
import { formatCurrency } from '@ecommerce/utils';
import { useCartStore } from '@/store/cart';

export function OrderSummary() {
  const { items, subtotal, discountTotal, taxTotal, shippingTotal, total } = useCartStore();

  return (
    <div className="bg-muted/30 rounded-xl p-6 space-y-4">
      <h2 className="font-semibold text-lg">Order Summary</h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
              {item.product.images[0] && (
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.images[0].altText ?? item.product.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              )}
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">{item.variant.title}</p>
            </div>
            <span className="text-sm font-medium shrink-0">
              {formatCurrency(item.unitPrice * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {discountTotal > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatCurrency(discountTotal)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shippingTotal === 0 ? 'Free' : formatCurrency(shippingTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatCurrency(taxTotal)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
