import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductVariant } from '@ecommerce/types';

interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  product: Pick<Product, 'id' | 'name' | 'slug' | 'images'>;
  variant: Pick<ProductVariant, 'id' | 'sku' | 'title' | 'price' | 'options'>;
  quantity: number;
  unitPrice: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  shippingTotal: number;
  total: number;
  addItem: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

function computeTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const taxTotal = Math.round(subtotal * 0.1);
  const total = subtotal + taxTotal;
  return { subtotal, discountTotal: 0, taxTotal, shippingTotal: 0, total };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      discountTotal: 0,
      taxTotal: 0,
      shippingTotal: 0,
      total: 0,

      addItem(product, variant, quantity) {
        const items = get().items;
        const existingIndex = items.findIndex(
          (i) => i.productId === product.id && i.variantId === variant.id,
        );

        let newItems: CartItem[];
        if (existingIndex >= 0) {
          newItems = items.map((item, i) =>
            i === existingIndex ? { ...item, quantity: item.quantity + quantity } : item,
          );
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}`,
            productId: product.id,
            variantId: variant.id,
            product: { id: product.id, name: product.name, slug: product.slug, images: product.images },
            variant: { id: variant.id, sku: variant.sku, title: variant.title, price: variant.price, options: variant.options },
            quantity,
            unitPrice: variant.price,
          };
          newItems = [...items, newItem];
        }

        set({ items: newItems, ...computeTotals(newItems) });
      },

      removeItem(id) {
        const newItems = get().items.filter((i) => i.id !== id);
        set({ items: newItems, ...computeTotals(newItems) });
      },

      updateQuantity(id, quantity) {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        const newItems = get().items.map((i) => (i.id === id ? { ...i, quantity } : i));
        set({ items: newItems, ...computeTotals(newItems) });
      },

      clearCart() {
        set({ items: [], subtotal: 0, discountTotal: 0, taxTotal: 0, shippingTotal: 0, total: 0 });
      },
    }),
    { name: 'cart-store' },
  ),
);
