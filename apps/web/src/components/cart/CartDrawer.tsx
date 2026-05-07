'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { formatCurrency } from '@ecommerce/utils';
import { useCartStore } from '@/store/cart';
import { CartItems } from './CartItems';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const total = useCartStore((s) => s.total);
  const itemCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-background shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-lg">Cart ({itemCount})</h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-accent">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <CartItems compact />
        </div>

        {itemCount > 0 && (
          <div className="px-6 py-4 border-t space-y-3">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="inline-flex items-center justify-center w-full h-11 rounded-md px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="inline-flex items-center justify-center w-full h-11 rounded-md px-8 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View Cart
            </Link>
          </div>
        )}

        {itemCount === 0 && (
          <div className="px-6 py-8 text-center text-muted-foreground">
            <p className="mb-4">Your cart is empty</p>
            <Link
              href="/products"
              onClick={onClose}
              className="inline-flex items-center justify-center h-10 rounded-md px-4 py-2 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
