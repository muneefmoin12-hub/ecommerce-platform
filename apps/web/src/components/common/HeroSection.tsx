import Link from 'next/link';
import { ShoppingBag, Star, Truck, Shield } from 'lucide-react';

const trustBadges = [
  { icon: Truck, label: 'Free shipping over $75' },
  { icon: Shield, label: '30-day easy returns' },
  { icon: Star, label: '4.9 / 5 from 2,400+ reviews' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf7f4]">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.06] pointer-events-none">
        <svg viewBox="0 0 600 600" className="w-full h-full" fill="none">
          <circle cx="400" cy="200" r="300" fill="hsl(27,74%,47%)" />
          <circle cx="500" cy="450" r="200" fill="hsl(14,80%,55%)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            New Collection — Summer 2025
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            Crafted for{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, hsl(27,74%,47%) 0%, hsl(14,80%,55%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              people
            </span>{' '}
            who care.
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Premium, responsibly sourced products — beautifully made and built to last.
            Discover pieces you&apos;ll reach for every day.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop New Arrivals
            </Link>
            <Link
              href="/products?tag=bestseller"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full text-sm font-semibold border-2 border-foreground/10 bg-white hover:border-primary hover:text-primary transition-all"
            >
              View Best Sellers
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col xs:flex-row flex-wrap gap-4 sm:gap-6">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-background"
        style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }}
      />
    </section>
  );
}
