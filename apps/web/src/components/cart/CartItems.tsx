'use client';

import Image from 'next/image';
import { Trash2, Minus, Plus } from 'lucide-react';
import { formatCurrency } from '@ecommerce/utils';
import { useCartStore } from '@/store/cart';

interface CartItemsProps {
  compact?: boolean;
}

export function CartItems({ compact = false }: CartItemsProps) {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
            {item.product.images[0] && (
              <Image
                src={item.product.images[0].url}
                alt={item.product.images[0].altText ?? item.product.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.variant.title}</p>

            {!compact && (
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-7 w-7 rounded border flex items-center justify-center hover:bg-muted"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-sm w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-7 w-7 rounded border flex items-center justify-center hover:bg-muted"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            )}
            {compact && (
              <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
            )}
          </div>

          <div className="flex flex-col items-end justify-between shrink-0">
            <span className="font-medium text-sm">
              {formatCurrency(item.unitPrice * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
