import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL ?? 'http://localhost:3001',
  timeout: 10_000,
});

export const adminApi = {
  products: {
    list: async (params?: Record<string, unknown>) => {
      const { data } = await http.get('/api/v1/products', { params });
      return data;
    },
    getById: async (id: string) => {
      const { data } = await http.get(`/api/v1/products/${id}`);
      return data.data;
    },
    create: async (payload: unknown) => {
      const { data } = await http.post('/api/v1/products', payload);
      return data.data;
    },
    update: async (id: string, payload: unknown) => {
      const { data } = await http.put(`/api/v1/products/${id}`, payload);
      return data.data;
    },
    delete: async (id: string) => {
      await http.delete(`/api/v1/products/${id}`);
    },
  },

  orders: {
    list: async (params?: Record<string, unknown>) => {
      const { data } = await http.get('/api/v1/orders', { params });
      return data;
    },
    getById: async (id: string) => {
      const { data } = await http.get(`/api/v1/orders/${id}`);
      return data.data;
    },
    updateStatus: async (id: string, status: string) => {
      const { data } = await http.put(`/api/v1/orders/${id}/status`, { status });
      return data.data;
    },
  },

  users: {
    list: async (params?: Record<string, unknown>) => {
      const { data } = await http.get('/api/v1/users', { params });
      return data;
    },
  },
};
