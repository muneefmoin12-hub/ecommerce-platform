import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, ShoppingBag, Users, ArrowRight, TrendingUp } from 'lucide-react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentOrders } from '@/components/orders/RecentOrders';

export const metadata: Metadata = { title: 'Dashboard' };

const quickLinks = [
  {
    href: '/orders',
    label: 'Order Management',
    desc: 'View, filter and update all orders',
    icon: ShoppingBag,
    count: '5 active orders',
    iconBg: 'bg-blue-500',
    badge: 'bg-blue-50 text-blue-700',
  },
  {
    href: '/products',
    label: 'Products',
    desc: 'Add, edit and manage your catalog',
    icon: Package,
    count: '6 products listed',
    iconBg: 'bg-amber-500',
    badge: 'bg-amber-50 text-amber-700',
  },
  {
    href: '/users',
    label: 'Customers & Users',
    desc: 'View customers and admin accounts',
    icon: Users,
    count: '8 registered users',
    iconBg: 'bg-violet-500',
    badge: 'bg-violet-50 text-violet-700',
  },
  {
    href: '/analytics',
    label: 'Analytics',
    desc: 'Revenue trends and traffic sources',
    icon: TrendingUp,
    count: '$48,250 this month',
    iconBg: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back, Admin. Here&apos;s your store overview.</p>
        </div>
        <span className="hidden sm:block text-xs text-gray-400 bg-white border border-gray-200 rounded-lg px-3 py-1.5 font-medium">
          May 2026
        </span>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className={`${item.iconBg} p-2.5 rounded-xl shadow-sm`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
              <span className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${item.badge}`}>
                {item.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <RecentOrders />
        </div>
      </div>

    </div>
  );
}
