import { create } from "zustand";
import type { AuthUser } from "../lib/types/auth";
import { tokenStorage } from "../lib/http/tokenStorage";

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  booted: boolean;

  hydrate: () => Promise<void>;
  setToken: (token: string | null) => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  booted: false,

  hydrate: async () => {
    const token = await tokenStorage.getAccessToken();
    set({ accessToken: token, booted: true });
  },

  setToken: async (token) => {
    if (token) await tokenStorage.setAccessToken(token);
    else await tokenStorage.clearAccessToken();
    set({ accessToken: token });
  },

  setUser: (user) => set({ user }),

  logout: async () => {
    await tokenStorage.clearAccessToken();
    set({ accessToken: null, user: null });
  },
}));
