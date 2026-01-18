export type ApiErrorDetails = Record<string, unknown> | unknown[] | string | null;

export interface ApiError {
  status: number; // 0 => network/unknown
  message: string;
  code?: string;
  details?: ApiErrorDetails;
  raw?: unknown;
}
