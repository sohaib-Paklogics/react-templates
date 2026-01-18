import { STORAGE_KEYS } from "@/shared/constants/storageKeys";

export const tokenStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
  setAccessToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },
  clearAccessToken() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
};
