import axios from "axios";
import { env } from "../../config/env";
import { mapAxiosError } from "./errorMapper";
import type { ApiError } from "../types/api";
import { toast } from "../../providers/toast";
import { useAuthStore } from "../../store/auth.store";
import { HTTP_HEADERS } from "../../constants/httpHeaders";

export const apiClient = axios.create({
  baseURL: env.API_URL,
  timeout: 30_000,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const apiError: ApiError = mapAxiosError(err);

    const suppressToast =
      String(err?.config?.headers?.[HTTP_HEADERS.SUPPRESS_TOAST] ?? "") === "1";

    // Global toast for ALL errors (your preference)
    if (!suppressToast) toast.error(apiError.message);

    if (apiError.status === 401) {
      // No refresh token: expire => logout.
      await useAuthStore.getState().logout();
    }

    return Promise.reject(apiError);
  }
);
