'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import type { Product, ProductVariant } from '@ecommerce/types';
import { Button, Badge } from '@ecommerce/ui';
import { formatCurrency, calculateDiscount } from '@ecommerce/utils';
import { useCartStore } from '@/store/cart';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]!);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0;

  function handleAddToCart() {
    if (!selectedVariant) return;
    addItem(product, selectedVariant, quantity);
    toast.success(`${product.name} added to cart`);
  }

  const optionKeys = selectedVariant
    ? Object.keys(selectedVariant.options)
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Images */}
      <div className="space-y-3">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          {product.images[selectedImage] ? (
            <Image
              src={product.images[selectedImage]!.url}
              alt={product.images[selectedImage]!.altText ?? product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">No image</div>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(i)}
                className={`relative h-16 w-16 shrink-0 rounded-md overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-primary' : 'border-transparent'}`}
              >
                <Image src={img.url} alt={img.altText ?? ''} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        <div>
          {product.categories[0] && (
            <p className="text-sm text-muted-foreground mb-2">{product.categories[0].name}</p>
          )}
          <h1 className="text-3xl font-bold">{product.name}</h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">{formatCurrency(selectedVariant?.price ?? product.price)}</span>
          {product.compareAtPrice && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
              <Badge variant="destructive">-{discount}%</Badge>
            </>
          )}
        </div>

        {/* Variants */}
        {product.variants.length > 1 && optionKeys.length > 0 && (
          <div className="space-y-3">
            {optionKeys.map((optionKey) => {
              const values = [...new Set(product.variants.map((v) => v.options[optionKey]))];
              return (
                <div key={optionKey}>
                  <p className="text-sm font-medium mb-2 capitalize">{optionKey}: <span className="font-normal">{selectedVariant.options[optionKey]}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {values.map((val) => {
                      const variant = product.variants.find((v) => v.options[optionKey] === val);
                      return (
                        <button
                          key={val}
                          onClick={() => variant && setSelectedVariant(variant)}
                          disabled={!variant || variant.inventoryQuantity === 0}
                          className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${selectedVariant.options[optionKey] === val ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary'}`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center border rounded-md">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted">−</button>
            <span className="px-4 py-2 font-medium text-sm">{quantity}</span>
            <button onClick={() => setQuantity(Math.min(selectedVariant?.inventoryQuantity ?? 1, quantity + 1))} className="px-3 py-2 hover:bg-muted">+</button>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={handleAddToCart}
          disabled={!selectedVariant || selectedVariant.inventoryQuantity === 0}
        >
          {selectedVariant?.inventoryQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
