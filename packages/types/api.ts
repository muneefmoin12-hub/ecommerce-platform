// ── API Response Wrappers ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  timestamp: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path?: string;
  details?: unknown;
}

// ── Query Parameters ──────────────────────────────────────────────────────────

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProductsQuery extends PaginationQuery {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  status?: string;
}

export interface OrdersQuery extends PaginationQuery {
  status?: string;
  userId?: string;
  fromDate?: string;
  toDate?: string;
}

// ── Webhook Types ─────────────────────────────────────────────────────────────

export interface WebhookEvent<T = unknown> {
  id: string;
  type: string;
  source: 'medusa' | 'stripe' | 'sanity';
  payload: T;
  timestamp: string;
}

export interface StripeWebhookEvent {
  id: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
}

// ── Authentication ────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export type UserRole = 'customer' | 'admin' | 'super_admin';
