const recentOrders = [
  { id: 'ORD-1001', customer: 'Alice Johnson', total: 128.50, status: 'delivered' },
  { id: 'ORD-1002', customer: 'Bob Smith', total: 229.98, status: 'processing' },
  { id: 'ORD-1003', customer: 'Carol White', total: 214.98, status: 'pending' },
  { id: 'ORD-1004', customer: 'Dave Brown', total: 89.98, status: 'shipped' },
  { id: 'ORD-1005', customer: 'Eve Davis', total: 185.98, status: 'confirmed' },
];

const statusStyles: Record<string, string> = {
  delivered: 'bg-emerald-100 text-emerald-700',
  processing: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-purple-100 text-purple-700',
  confirmed: 'bg-cyan-100 text-cyan-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function RecentOrders() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Recent Orders</h3>
        <a
          href="/orders"
          className="text-xs font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors"
        >
          View all
        </a>
      </div>
      <div className="flex-1 space-y-3">
        {recentOrders.map((order) => (
          <div key={order.id} className="flex items-center justify-between gap-2 py-1">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{order.customer}</p>
              <p className="text-xs text-gray-400 font-mono">{order.id}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-sm font-semibold text-gray-900">
                ${order.total.toFixed(2)}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
