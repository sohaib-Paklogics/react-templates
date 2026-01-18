import * as SecureStore from "expo-secure-store";
import { env } from "@/config/env";

export const tokenStorage = {
  async getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(env.AUTH_TOKEN_KEY);
  },
  async setAccessToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(env.AUTH_TOKEN_KEY, token);
  },
  async clearAccessToken(): Promise<void> {
    await SecureStore.deleteItemAsync(env.AUTH_TOKEN_KEY);
  },
};
