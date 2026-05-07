import type { Metadata } from 'next';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
          <CheckoutForm />
        </div>
        <div className="lg:col-span-2">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
