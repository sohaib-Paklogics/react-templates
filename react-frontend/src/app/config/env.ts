function required(name: string, value: string | undefined) {
  if (!value) {
    // eslint-disable-next-line no-console
    console.warn(`[env] Missing ${name}. Did you set it in .env?`);
  }
  return value ?? "";
}

export const env = {
  API_URL: required("VITE_API_URL", import.meta.env.VITE_API_URL),
} as const;
