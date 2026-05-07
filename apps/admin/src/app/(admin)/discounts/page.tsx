import type { Metadata } from 'next';
import { Tag, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'Discounts' };

const discounts = [
  { code: 'WELCOME10', type: 'Percentage', value: '10%', uses: 42, limit: 100, status: 'active', expires: 'Dec 31, 2026' },
  { code: 'SUMMER20', type: 'Percentage', value: '20%', uses: 88, limit: 200, status: 'active', expires: 'Aug 31, 2026' },
  { code: 'FLAT15', type: 'Fixed Amount', value: '$15.00', uses: 15, limit: 50, status: 'active', expires: 'Oct 15, 2026' },
  { code: 'LAUNCH50', type: 'Percentage', value: '50%', uses: 50, limit: 50, status: 'expired', expires: 'Jan 01, 2026' },
  { code: 'VIP25', type: 'Percentage', value: '25%', uses: 7, limit: null, status: 'active', expires: 'No expiry' },
];

export default function DiscountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discounts</h1>
          <p className="text-gray-500 text-sm mt-1">{discounts.length} discount codes</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold bg-amber-500 text-white hover:bg-amber-400 transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
          Create Discount
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Code', 'Type', 'Value', 'Used / Limit', 'Expires', 'Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {discounts.map((d) => (
                <tr key={d.code} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span className="font-mono font-semibold text-gray-900 text-xs">{d.code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{d.type}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{d.value}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {d.uses} / {d.limit ?? '∞'}
                    {d.limit && (
                      <div className="mt-1 w-20 bg-gray-100 rounded-full h-1">
                        <div
                          className="bg-amber-500 h-1 rounded-full"
                          style={{ width: `${Math.min((d.uses / d.limit) * 100, 100)}%` }}
                        />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{d.expires}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      d.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
