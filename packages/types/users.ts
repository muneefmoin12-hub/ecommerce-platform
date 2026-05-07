import type { Address } from './commerce';
import type { UserRole } from './api';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: UserRole;
  emailVerified: boolean;
  addresses: Address[];
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  currency: string;
  language: string;
  marketingEmails: boolean;
  orderUpdates: boolean;
}

export interface UserProfile extends Omit<User, 'role'> {
  orderCount: number;
  totalSpent: number;
}
