import type { Metadata } from 'next';
import { CartItems } from '@/components/cart/CartItems';
import { CartSummary } from '@/components/cart/CartSummary';

export const metadata: Metadata = {
  title: 'Shopping Cart',
};

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItems />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
