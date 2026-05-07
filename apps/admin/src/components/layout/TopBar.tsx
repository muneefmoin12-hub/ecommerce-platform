'use client';

import { Bell, Search, LogOut } from 'lucide-react';

export function TopBar() {
  function handleLogout() {
    document.cookie = 'admin-auth=; path=/; max-age=0';
    window.location.href = '/login';
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 lg:pl-6 pl-16">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search products, orders..."
          className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-48 md:w-72 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200 ml-1">
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-semibold text-sm shrink-0">
            A
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-semibold text-gray-900 leading-none">Admin</p>
            <p className="text-gray-400 text-xs mt-0.5">admin@yourbrand.com</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors ml-1"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
