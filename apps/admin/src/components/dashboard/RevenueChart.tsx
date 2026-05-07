'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 4900 },
  { month: 'Apr', revenue: 7200 },
  { month: 'May', revenue: 6100 },
  { month: 'Jun', revenue: 8900 },
  { month: 'Jul', revenue: 9400 },
  { month: 'Aug', revenue: 8200 },
  { month: 'Sep', revenue: 10100 },
  { month: 'Oct', revenue: 11500 },
  { month: 'Nov', revenue: 13200 },
  { month: 'Dec', revenue: 15800 },
];

export function RevenueChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
          <p className="text-xs text-gray-400 mt-0.5">Monthly revenue for 2024</p>
        </div>
        <span className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1 font-medium">2024</span>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4691d" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#d4691d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)', fontSize: '13px' }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#d4691d" strokeWidth={2} fill="url(#revenueGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
