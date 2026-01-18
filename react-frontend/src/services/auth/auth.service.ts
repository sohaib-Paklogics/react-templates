import { apiClient } from "@/services/http/apiClient";
import type { AuthTokenResponse, AuthUser } from "@/shared/types/auth";

export const authService = {
  async login(payload: { email: string; password: string }): Promise<AuthTokenResponse> {
    const { data } = await apiClient.post<AuthTokenResponse>("/auth/login", payload);
    return data;
  },

  async me(): Promise<AuthUser> {
    const { data } = await apiClient.get<AuthUser>("/auth/me");
    return data;
  },
};
