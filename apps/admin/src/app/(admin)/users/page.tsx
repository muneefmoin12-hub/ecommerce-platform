import type { Metadata } from 'next';
import { adminApi } from '@/lib/admin-api';
import { ADMIN_MOCK_USERS } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'Users' };

export default async function UsersPage() {
  const users = await adminApi.users
    .list()
    .catch(() => ({
      data: ADMIN_MOCK_USERS,
      meta: { total: ADMIN_MOCK_USERS.length, page: 1, limit: 50, totalPages: 1 },
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 text-sm mt-1">{users.meta.total} registered users</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Name', 'Email', 'Role', 'Joined'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.data.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-semibold text-xs shrink-0">
                        {((user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '')).toUpperCase() || '?'}
                      </div>
                      <span className="font-medium text-gray-900">
                        {[user.firstName, user.lastName].filter(Boolean).join(' ') || '—'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
          {users.meta.total} total users
        </div>
      </div>
    </div>
  );
}
