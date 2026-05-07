'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Zap } from 'lucide-react';

const ADMIN_EMAIL = 'admin@yourbrand.com';
const ADMIN_PASSWORD = 'Admin@12345';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function fillDemo() {
    setEmail(ADMIN_EMAIL);
    setPassword(ADMIN_PASSWORD);
    setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    const enteredEmail = email.trim().toLowerCase();
    const expectedEmail = ADMIN_EMAIL.toLowerCase();

    if (enteredEmail === expectedEmail && password.trim() === ADMIN_PASSWORD) {
      document.cookie = 'admin-auth=1; path=/; max-age=86400';
      window.location.href = '/dashboard';
    } else {
      setError('Incorrect email or password. Use the button below to fill demo credentials.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 rounded-xl bg-amber-500 items-center justify-center mb-3">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">YourBrand</h1>
          <p className="text-slate-400 text-sm mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
          <h2 className="text-lg font-semibold text-white mb-6">Sign in</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@yourbrand.com"
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors p-1"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword
                    ? <EyeOff className="h-4 w-4" />
                    : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-xs leading-relaxed">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-amber-500 text-white font-semibold text-sm hover:bg-amber-400 active:bg-amber-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Demo fill */}
          <div className="mt-5 pt-5 border-t border-slate-700 space-y-3">
            <button
              type="button"
              onClick={fillDemo}
              className="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-slate-600 text-slate-300 text-xs font-medium hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              Fill demo credentials
            </button>
            <div className="bg-slate-700/50 rounded-lg px-3 py-2.5 space-y-1">
              <p className="text-xs text-slate-400">
                <span className="text-slate-500">Email:</span>{' '}
                <span className="font-mono text-slate-300 select-all">{ADMIN_EMAIL}</span>
              </p>
              <p className="text-xs text-slate-400">
                <span className="text-slate-500">Password:</span>{' '}
                <span className="font-mono text-slate-300 select-all">{ADMIN_PASSWORD}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
