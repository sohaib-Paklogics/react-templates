export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

export type ApiErrorDetails = JsonObject | JsonArray | string | null;

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: ApiErrorDetails;
  raw?: unknown;
}
