'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@ecommerce/types';
import { Badge, Button, cn } from '@ecommerce/ui';
import { formatCurrency, calculateDiscount } from '@ecommerce/utils';
import { useCartStore } from '@/store/cart';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const primaryImage = product.images[0];
  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0;

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    const defaultVariant = product.variants[0];
    if (!defaultVariant) return;
    addItem(product, defaultVariant, 1);
    toast.success(`${product.name} added to cart`);
  }

  return (
    <Link href={`/products/${product.slug}`} className={cn('group block', className)}>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mb-3">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText ?? product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
            No image
          </div>
        )}

        {discount > 0 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            -{discount}%
          </Badge>
        )}

        {product.inventoryQuantity === 0 && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-sm font-medium">Out of stock</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.inventoryQuantity === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button size="icon" variant="outline" className="shrink-0" onClick={(e) => e.preventDefault()}>
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1">
          {product.categories[0]?.name}
        </p>
        <h3 className="font-medium text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{formatCurrency(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
