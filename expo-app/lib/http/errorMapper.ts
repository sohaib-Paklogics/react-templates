import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";

const isString = (v: unknown): v is string => typeof v === "string";

export function mapAxiosError(err: unknown): ApiError {
  const fallback: ApiError = { status: 0, message: "Network error", raw: err };

  const ax = err as AxiosError<any>;
  if (!ax || typeof ax !== "object") return fallback;

  const status = ax.response?.status ?? 0;
  const data = ax.response?.data;

  const message =
    (isString(data?.message) && data.message) ||
    (isString(data?.error) && data.error) ||
    (isString(ax.message) && ax.message) ||
    (status ? `Request failed (${status})` : "Network error");

  return {
    status,
    message,
    code: isString(data?.code) ? data.code : ax.code,
    details: data?.details ?? data?.errors ?? null,
    raw: err,
  };
}
