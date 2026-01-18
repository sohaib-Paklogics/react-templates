import { create } from "zustand";
import { tokenStorage } from "@/services/http/tokenStorage";
import type { AuthUser } from "@/shared/types/auth";

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  setToken: (token: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: tokenStorage.getAccessToken(),
  user: null,

  setToken: (token) => {
    if (token) tokenStorage.setAccessToken(token);
    else tokenStorage.clearAccessToken();
    set({ accessToken: token });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    tokenStorage.clearAccessToken();
    set({ accessToken: null, user: null });
  },
}));
