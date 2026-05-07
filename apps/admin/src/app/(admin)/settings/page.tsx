import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your store configuration</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <div className="px-6 py-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Name</label>
              <input
                type="text"
                defaultValue="YourBrand"
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Support Email</label>
              <input
                type="email"
                defaultValue="hello@yourbrand.com"
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
              <select className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors bg-white">
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — British Pound</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Admin Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Admin Email</label>
              <input
                type="email"
                defaultValue="admin@yourbrand.com"
                readOnly
                className="w-full h-10 px-3 rounded-lg border border-gray-100 bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                defaultValue="Admin@12345"
                readOnly
                className="w-full h-10 px-3 rounded-lg border border-gray-100 bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-3">
            {[
              { label: 'New order placed', desc: 'Get notified when a customer places an order' },
              { label: 'Low inventory alert', desc: 'Alert when product stock falls below 10 units' },
              { label: 'New customer registered', desc: 'Get notified on new customer sign-ups' },
            ].map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="h-10 px-6 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-400 transition-colors shadow-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}
