export type AppEnv = "development" | "staging" | "production";

function pickAppEnv(): AppEnv {
  const v = (process.env.EXPO_PUBLIC_APP_ENV ?? "") as AppEnv;
  if (v === "development" || v === "staging" || v === "production") return v;
  // Expo provides __DEV__ at runtime
  // eslint-disable-next-line no-undef
  return __DEV__ ? "development" : "production";
}

function boolFromEnv(v: string | undefined, fallback: boolean): boolean {
  if (v == null) return fallback;
  const s = String(v).trim().toLowerCase();
  if (["1", "true", "yes", "y"].includes(s)) return true;
  if (["0", "false", "no", "n"].includes(s)) return false;
  return fallback;
}

function pickApiUrl(appEnv: AppEnv): string {
  // Preferred: set a single variable per build/profile
  const direct = process.env.EXPO_PUBLIC_API_URL;
  if (direct) return direct;

  // Alternative: set per-environment variables and pick via EXPO_PUBLIC_APP_ENV
  const dev = process.env.EXPO_PUBLIC_API_URL_DEV;
  const stg = process.env.EXPO_PUBLIC_API_URL_STAGING;
  const prod = process.env.EXPO_PUBLIC_API_URL_PROD;

  const selected =
    appEnv === "production" ? prod : appEnv === "staging" ? stg : dev;

  if (!selected) {
    // eslint-disable-next-line no-console
    console.warn(
      "[env] Missing API URL. Set EXPO_PUBLIC_API_URL (recommended) or EXPO_PUBLIC_API_URL_DEV/STAGING/PROD."
    );
  }
  return selected ?? "";
}

const APP_ENV = pickAppEnv();
const API_URL = pickApiUrl(APP_ENV);

export const env = {
  APP_ENV,
  API_URL,

  // Access token key used in SecureStore
  AUTH_TOKEN_KEY: process.env.EXPO_PUBLIC_AUTH_TOKEN_KEY ?? "access_token",

  // Keep onboarding visible during development unless explicitly overridden
  ONBOARDING_PERSIST: boolFromEnv(
    process.env.EXPO_PUBLIC_ONBOARDING_PERSIST,
    APP_ENV !== "development"
  ),
} as const;
