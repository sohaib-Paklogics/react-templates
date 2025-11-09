import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';
import { ENV } from './env';

export const api = axios.create({ baseURL: ENV.API_BASE_URL, timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
