import axios from "axios";
import { toast } from "sonner";
import { env } from "@/app/config/env";
import { tokenStorage } from "./tokenStorage";
import { mapAxiosError } from "./errorMapper";
import { ROUTES } from "@/shared/constants/routes";
import { HTTP_HEADERS } from "@/shared/constants/httpHeaders";
import type { ApiError } from "@/shared/types/api";

export const apiClient = axios.create({
  baseURL: env.API_URL,
  timeout: 30_000,
  withCredentials: false, // access-token only
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let redirecting401 = false;

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const apiError: ApiError = mapAxiosError(err);

    // Global toast for ALL API errors by default.
    // You can suppress a toast for specific calls via:
    // apiClient.get(url, { headers: { "x-suppress-toast": "1" } })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const headers = (err?.config?.headers ?? {}) as any;
    const suppressToast = headers[HTTP_HEADERS.SUPPRESS_TOAST] === "1";
    if (!suppressToast) toast.error(apiError.message);

    if (apiError.status === 401) {
      tokenStorage.clearAccessToken();

      // Avoid redirect loops when multiple requests fail at once
      if (!redirecting401) {
        redirecting401 = true;
        window.location.assign(ROUTES.LOGIN);
        window.setTimeout(() => {
          redirecting401 = false;
        }, 1500);
      }
    }

    return Promise.reject(apiError);
  }
);
