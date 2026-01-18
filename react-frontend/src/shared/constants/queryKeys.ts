export const QUERY_KEYS = {
  auth: {
    me: ["auth", "me"] as const,
  },
  users: {
    list: (params: { q?: string; page?: number; limit?: number } | undefined) =>
      ["users", "list", params ?? {}] as const,
    detail: (id: string) => ["users", "detail", id] as const,
  },
} as const;
