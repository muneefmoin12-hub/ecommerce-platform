import type { Metadata } from 'next';
import { TrendingUp, ShoppingBag, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Analytics' };

const topProducts = [
  { name: 'Merino Wool Sweater', sales: 124, revenue: '$18,575', trend: '+14%', up: true },
  { name: 'Artisan Leather Wallet', sales: 98, revenue: '$8,810', trend: '+9%', up: true },
  { name: 'Ceramic Pour-Over Set', sales: 76, revenue: '$6,079', trend: '+22%', up: true },
  { name: 'Scented Soy Candle', sales: 65, revenue: '$2,274', trend: '-3%', up: false },
  { name: 'Bamboo Cutting Board Set', sales: 52, revenue: '$3,379', trend: '+5%', up: true },
];

const trafficSources = [
  { source: 'Organic Search', sessions: 4821, pct: 48 },
  { source: 'Direct', sessions: 2104, pct: 21 },
  { source: 'Social Media', sessions: 1523, pct: 15 },
  { source: 'Email', sessions: 1012, pct: 10 },
  { source: 'Referral', sessions: 540, pct: 6 },
];

const monthlyStats = [
  { label: 'Total Revenue', value: '$48,250', change: '+12.5%', up: true, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Orders Placed', value: '1,284', change: '+8.2%', up: true, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'New Customers', value: '342', change: '+4.1%', up: true, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Avg. Order Value', value: '$37.58', change: '+3.8%', up: true, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Performance overview for the last 30 days</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {monthlyStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <div className={`${stat.bg} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
              <p className={`text-sm mt-1.5 font-medium flex items-center gap-1 ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {stat.change} <span className="text-gray-400 font-normal">vs last month</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Top Products by Revenue</h3>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 w-5 text-right shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                    <span className={`text-xs font-semibold ml-2 shrink-0 ${p.up ? 'text-emerald-600' : 'text-red-500'}`}>{p.trend}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full"
                        style={{ width: `${(p.sales / topProducts[0].sales) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 shrink-0">{p.sales} sold</span>
                    <span className="text-xs font-semibold text-gray-700 shrink-0">{p.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((t) => (
              <div key={t.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-700">{t.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{t.sessions.toLocaleString()}</span>
                    <span className="text-sm font-semibold text-gray-800 w-8 text-right">{t.pct}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
