import type { AxiosError } from "axios";
import type { ApiError } from "@/shared/types/api";

function safeString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

export function mapAxiosError(err: unknown): ApiError {
  const fallback: ApiError = { status: 0, message: "Something went wrong", raw: err };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ax = err as AxiosError<any> | undefined;
  if (!ax || typeof ax !== "object") return fallback;

  const status = ax.response?.status ?? 0;
  const data = ax.response?.data;

  const message =
    safeString(data?.message) ||
    safeString(data?.error) ||
    safeString(ax.message) ||
    (status ? `Request failed (${status})` : "Network error");

  const code = safeString(data?.code) || safeString(ax.code);
  const details = data?.details ?? data?.errors ?? null;

  return { status, message, code, details, raw: err };
}
