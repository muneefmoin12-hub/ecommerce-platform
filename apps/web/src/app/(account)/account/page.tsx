import type { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingBag, User, MapPin, Heart, LogOut } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Account',
  robots: { index: false },
};

const accountLinks = [
  { href: '/account/orders', icon: ShoppingBag, label: 'My Orders', description: 'Track and manage your orders' },
  { href: '/account/profile', icon: User, label: 'Profile', description: 'Update your personal information' },
  { href: '/account/addresses', icon: MapPin, label: 'Addresses', description: 'Manage your shipping addresses' },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist', description: 'Products you\'ve saved for later' },
];

export default function AccountPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
          G
        </div>
        <div>
          <h1 className="text-2xl font-bold">My Account</h1>
          <p className="text-muted-foreground text-sm">guest@example.com</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {accountLinks.map(({ href, icon: Icon, label, description }) => (
          <Link
            key={href}
            href={href}
            className="p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-sm transition-all group"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t">
        <Link
          href="/login"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Link>
      </div>
    </div>
  );
}
