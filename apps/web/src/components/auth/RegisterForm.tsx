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

const registerSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Minimum 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
type RegisterData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const setTokens = useAuthStore((s) => s.setTokens);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: RegisterData) {
    setLoading(true);
    try {
      const tokens = await apiClient.auth.register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      setTokens(tokens);
      router.push('/account');
    } catch {
      toast.error('Failed to create account. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name: 'firstName' as const, label: 'First Name', type: 'text', autoComplete: 'given-name' },
    { name: 'lastName' as const, label: 'Last Name', type: 'text', autoComplete: 'family-name' },
    { name: 'email' as const, label: 'Email', type: 'email', autoComplete: 'email' },
    { name: 'password' as const, label: 'Password', type: 'password', autoComplete: 'new-password' },
    { name: 'confirmPassword' as const, label: 'Confirm Password', type: 'password', autoComplete: 'new-password' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium mb-1">{field.label}</label>
          <input
            {...register(field.name)}
            type={field.type}
            autoComplete={field.autoComplete}
            className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors[field.name] && (
            <p className="text-destructive text-xs mt-1">{errors[field.name]?.message}</p>
          )}
        </div>
      ))}
      <Button type="submit" size="lg" className="w-full" loading={loading}>
        Create Account
      </Button>
    </form>
  );
}
