'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@ecommerce/ui';
import { useCartStore } from '@/store/cart';
import { CartDrawer } from '@/components/cart/CartDrawer';

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const itemCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link href="/" className="font-bold text-xl mr-6 tracking-tight">
            YourBrand
          </Link>

          <nav className="hidden md:flex items-center gap-6 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname.startsWith(link.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            <a
              href="http://localhost:3002/dashboard"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold bg-amber-500 text-white hover:bg-amber-400 transition-colors shadow-sm"
            >
              Go to Dashboard
            </a>
            <Link
              href="/search"
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/account"
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 rounded-md hover:bg-accent transition-colors relative"
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t bg-background px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="http://localhost:3002/dashboard"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-semibold bg-amber-500 text-white"
            >
              Go to Dashboard
            </a>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
