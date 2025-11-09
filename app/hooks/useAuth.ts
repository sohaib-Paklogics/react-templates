import { useState } from 'react';
import { api } from '../config/api';
import { LoginInput, SignupInput } from '../constants/schemas';
import { useAuthStore } from '@/store/auth.store';

export function useAuth() {
  const setAuth = useAuthStore((s:any) => s.setAuth);
  const [loading, setLoading] = useState(false);

  async function login(payload: LoginInput) {
    setLoading(true);
    try {
      const { data } = await api.post('/user-auth/login', payload);
      const token = data?.data?.token || data?.token || data?.data?.tempToken;
      const user = data?.data?.user || data?.user;
      setAuth(token, user);
      return { token, user };
    } finally { setLoading(false); }
  }
  async function signup(payload: SignupInput) {
    setLoading(true);
    try { await api.post('/user-auth/add-user', payload); return true; }
    finally { setLoading(false); }
  }
  return { login, signup, loading };
}
