import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type {
  Product,
  Cart,
  Order,
  ApiResponse,
  PaginatedResponse,
  AuthTokens,
  ProductsQuery,
  OrdersQuery,
} from '@ecommerce/types';

class ApiClient {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10_000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.http.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.http.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const { data } = await this.http.post<ApiResponse<AuthTokens>>('/api/v1/auth/refresh', { refreshToken });
            localStorage.setItem('access_token', data.data.accessToken);
            localStorage.setItem('refresh_token', data.data.refreshToken);
            return this.http(originalRequest);
          } catch {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      },
    );
  }

  readonly products = {
    list: async (query?: ProductsQuery): Promise<PaginatedResponse<Product>> => {
      const { data } = await this.http.get<PaginatedResponse<Product>>('/api/v1/products', { params: query });
      return data;
    },
    getById: async (id: string): Promise<Product> => {
      const { data } = await this.http.get<ApiResponse<Product>>(`/api/v1/products/${id}`);
      return data.data;
    },
    getBySlug: async (slug: string): Promise<Product> => {
      const { data } = await this.http.get<ApiResponse<Product>>(`/api/v1/products/slug/${slug}`);
      return data.data;
    },
  };

  readonly cart = {
    get: async (): Promise<Cart> => {
      const { data } = await this.http.get<ApiResponse<Cart>>('/api/v1/cart');
      return data.data;
    },
    addItem: async (productId: string, variantId: string, quantity: number): Promise<Cart> => {
      const { data } = await this.http.post<ApiResponse<Cart>>('/api/v1/cart/items', {
        productId,
        variantId,
        quantity,
      });
      return data.data;
    },
    updateItem: async (itemId: string, quantity: number): Promise<Cart> => {
      const { data } = await this.http.patch<ApiResponse<Cart>>(`/api/v1/cart/items/${itemId}`, { quantity });
      return data.data;
    },
    removeItem: async (itemId: string): Promise<Cart> => {
      const { data } = await this.http.delete<ApiResponse<Cart>>(`/api/v1/cart/items/${itemId}`);
      return data.data;
    },
    clear: async (): Promise<void> => {
      await this.http.delete('/api/v1/cart');
    },
    applyCoupon: async (code: string): Promise<Cart> => {
      const { data } = await this.http.post<ApiResponse<Cart>>('/api/v1/cart/coupon', { code });
      return data.data;
    },
  };

  readonly orders = {
    list: async (query?: OrdersQuery): Promise<PaginatedResponse<Order>> => {
      const { data } = await this.http.get<PaginatedResponse<Order>>('/api/v1/orders', { params: query });
      return data;
    },
    getById: async (id: string): Promise<Order> => {
      const { data } = await this.http.get<ApiResponse<Order>>(`/api/v1/orders/${id}`);
      return data.data;
    },
    create: async (payload: unknown): Promise<Order> => {
      const { data } = await this.http.post<ApiResponse<Order>>('/api/v1/orders', payload);
      return data.data;
    },
  };

  readonly auth = {
    login: async (email: string, password: string): Promise<AuthTokens> => {
      const { data } = await this.http.post<ApiResponse<AuthTokens>>('/api/v1/auth/login', { email, password });
      return data.data;
    },
    register: async (payload: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    }): Promise<AuthTokens> => {
      const { data } = await this.http.post<ApiResponse<AuthTokens>>('/api/v1/auth/register', payload);
      return data.data;
    },
    logout: async (): Promise<void> => {
      await this.http.post('/api/v1/auth/logout');
    },
  };
}

export const apiClient = new ApiClient();
