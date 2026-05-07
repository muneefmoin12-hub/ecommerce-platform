'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@ecommerce/ui';
import { isValidEmail } from '@ecommerce/utils';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success('Thanks for subscribing!');
      setEmail('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Stay in the loop</h2>
        <p className="text-primary-foreground/80 mb-6 md:mb-8 max-w-md mx-auto text-sm sm:text-base">
          Get early access to new products, exclusive deals, and style inspiration.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2.5 rounded-md text-foreground bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" loading={loading} variant="secondary">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
