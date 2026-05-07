'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

export function ConfirmationContent() {
  const params = useSearchParams();
  const displayId = params.get('displayId') || 'ORD-XXXX';

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="inline-flex h-20 w-20 rounded-full bg-green-100 items-center justify-center mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Order confirmed!</h1>
      <p className="text-muted-foreground text-lg mb-2">
        Thank you for your purchase.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        Order reference: <span className="font-semibold text-foreground">{displayId}</span>
      </p>

      <div className="bg-secondary/40 rounded-2xl p-6 mb-8 text-left space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Package className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm">What happens next?</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              You&apos;ll receive an email confirmation shortly. We&apos;ll send tracking information once
              your order ships — usually within 1-2 business days.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/account/orders"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
        >
          Track your order
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-sm font-semibold border-2 border-foreground/10 bg-white hover:border-primary hover:text-primary transition-all"
        >
          <Home className="h-4 w-4" />
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
