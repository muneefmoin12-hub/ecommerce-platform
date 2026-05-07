'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Settings,
  BarChart3, Tag, ExternalLink, Menu, X,
} from 'lucide-react';
import { cn } from '@ecommerce/ui';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/discounts', label: 'Discounts', icon: Tag },
  { href: '/settings', label: 'Settings', icon: Settings },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-900 flex flex-col h-full">
      <div className="px-5 py-5 border-b border-slate-700/60 flex items-center justify-between">
        <div>
          <span className="font-bold text-lg text-white tracking-tight">YourBrand</span>
          <p className="text-xs text-slate-400 mt-0.5">Admin Panel</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-slate-700/60">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Storefront
        </a>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger — only visible below lg */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex shrink-0 h-full">
        <SidebarContent />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 z-50 flex transition-transform duration-200',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </div>
    </>
  );
}
