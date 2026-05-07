'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@ecommerce/ui';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth';

const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password required'),
});
type LoginData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const setTokens = useAuthStore((s) => s.setTokens);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: LoginData) {
    setLoading(true);
    try {
      const tokens = await apiClient.auth.login(data.email, data.password);
      setTokens(tokens);
      router.push('/account');
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          {...register('password')}
          type="password"
          autoComplete="current-password"
          className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
      </div>
      <div className="text-right">
        <a href="/forgot-password" className="text-xs text-primary hover:underline">
          Forgot password?
        </a>
      </div>
      <Button type="submit" size="lg" className="w-full" loading={loading}>
        Sign In
      </Button>
    </form>
  );
}
