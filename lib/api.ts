// lib/api.ts
import axios from 'axios';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';

export const api = axios.create({
  baseURL: API_BASE,
});

export const setAuthToken = (token: string | null) => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
};

api.interceptors.request.use((config) => {
  try {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        if (config.headers) delete (config.headers as any)['Authorization'];
      }
    }
  } catch (err) {
    console.warn('api interceptor error', err);
  }
  return config;
});
