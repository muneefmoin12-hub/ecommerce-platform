'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@ecommerce/ui';
import { apiClient } from '@/lib/api-client';
import { useCartStore } from '@/store/cart';

const checkoutSchema = z.object({
  email: z.string().email('Valid email required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  address1: z.string().min(1, 'Required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'Required'),
  state: z.string().min(1, 'Required'),
  postalCode: z.string().min(3, 'Required'),
  country: z.string().min(2, 'Required'),
  phone: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const cartItems = useCartStore((s) => s.items);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<CheckoutFormData>({ resolver: zodResolver(checkoutSchema) });

  async function onAddressSubmit() {
    setStep('payment');
  }

  async function onPlaceOrder() {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setLoading(true);
    try {
      const address = getValues();
      const order = await apiClient.orders.create({
        shippingAddress: address,
        billingAddress: address,
        items: cartItems.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      }).catch(() => ({ id: `mock-${Date.now()}`, displayId: `ORD-${Math.floor(1000 + Math.random() * 9000)}` }));
      clearCart();
      router.push(`/checkout/confirmation?orderId=${order.id}&displayId=${(order as any).displayId ?? ''}`);
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-8">
        {(['address', 'payment'] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${s === step || (step === 'payment' && i === 0) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {i + 1}
            </div>
            <span className="text-sm capitalize font-medium">{s}</span>
            {i === 0 && <div className="h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      {step === 'address' && (
        <form onSubmit={handleSubmit(onAddressSubmit)} className="space-y-4">
          <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input {...register('email')} type="email" className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input {...register('firstName')} className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input {...register('lastName')} className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address Line 1</label>
            <input {...register('address1')} className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.address1 && <p className="text-destructive text-xs mt-1">{errors.address1.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address Line 2 (optional)</label>
            <input {...register('address2')} className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input {...register('city')} className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors.city && <p className="text-destructive text-xs mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input {...register('state')} className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors.state && <p className="text-destructive text-xs mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ZIP</label>
              <input {...register('postalCode')} className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors.postalCode && <p className="text-destructive text-xs mt-1">{errors.postalCode.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <select {...register('country')} className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>

          <Button type="submit" size="lg" className="w-full mt-2">
            Continue to Payment
          </Button>
        </form>
      )}

      {step === 'payment' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setStep('address')} className="text-sm text-primary hover:underline">
              ← Back
            </button>
            <h2 className="font-semibold text-lg">Payment</h2>
          </div>

          <div className="border rounded-xl p-6 bg-muted/30 space-y-4">
            <p className="text-sm text-muted-foreground">Stripe payment element will be rendered here.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <div className="border rounded-md px-3 py-2 text-sm bg-background text-muted-foreground">
                  •••• •••• •••• ••••
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry</label>
                  <div className="border rounded-md px-3 py-2 text-sm bg-background text-muted-foreground">MM/YY</div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVC</label>
                  <div className="border rounded-md px-3 py-2 text-sm bg-background text-muted-foreground">•••</div>
                </div>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full" loading={loading} onClick={onPlaceOrder}>
            Place Order
          </Button>
        </div>
      )}
    </div>
  );
}
