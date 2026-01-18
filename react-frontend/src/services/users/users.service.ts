import { apiClient } from "@/services/http/apiClient";
import type { User } from "@/shared/types/user";

export const usersService = {
  async list(params?: { q?: string; page?: number; limit?: number }): Promise<User[]> {
    const { data } = await apiClient.get<User[]>("/users", { params });
    return data;
  },

  async byId(id: string): Promise<User> {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  },
};
