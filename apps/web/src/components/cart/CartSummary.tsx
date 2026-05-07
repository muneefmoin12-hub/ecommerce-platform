'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@ecommerce/ui';
import { formatCurrency } from '@ecommerce/utils';
import { useCartStore } from '@/store/cart';

export function CartSummary() {
  const { subtotal, discountTotal, taxTotal, shippingTotal, total } = useCartStore();
  const [coupon, setCoupon] = useState('');

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4 sticky top-24">
      <h2 className="font-semibold text-lg">Order Summary</h2>

      <div className="space-y-2 text-sm">
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
          <span>{shippingTotal === 0 ? 'Calculated at checkout' : formatCurrency(shippingTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>{taxTotal === 0 ? 'Calculated at checkout' : formatCurrency(taxTotal)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Coupon code"
          className="flex-1 border rounded-md px-3 py-2 text-sm bg-background"
        />
        <Button variant="outline" size="sm">Apply</Button>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="inline-flex items-center justify-center w-full h-11 rounded-md px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
