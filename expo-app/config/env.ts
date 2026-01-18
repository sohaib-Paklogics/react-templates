// Centralized env access for Expo
// Prefer EXPO_PUBLIC_* for values that must be available at runtime in the client.
export const env = {
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? "",
} as const;
