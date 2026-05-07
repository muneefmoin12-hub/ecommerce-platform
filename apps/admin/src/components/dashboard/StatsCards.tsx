import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
  {
    label: 'Total Revenue',
    value: '$48,250',
    change: '+12.5%',
    positive: true,
    icon: DollarSign,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    border: 'border-emerald-100',
  },
  {
    label: 'Total Orders',
    value: '1,284',
    change: '+8.2%',
    positive: true,
    icon: ShoppingBag,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'border-blue-100',
  },
  {
    label: 'New Customers',
    value: '342',
    change: '+4.1%',
    positive: true,
    icon: Users,
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    border: 'border-violet-100',
  },
  {
    label: 'Conversion Rate',
    value: '3.24%',
    change: '-0.3%',
    positive: false,
    icon: TrendingUp,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    border: 'border-amber-100',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const Arrow = stat.positive ? ArrowUpRight : ArrowDownRight;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <div className={`${stat.bg} ${stat.border} border p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${stat.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              <Arrow className="h-3.5 w-3.5" />
              <span>{stat.change}</span>
              <span className="text-gray-400 font-normal text-xs ml-0.5">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
