export const QK = {
  users: (params?: { q?: string; page?: number; limit?: number }) =>
    ["users", params ?? {}] as const,

  user: (id: string) => ["users", "detail", id] as const,
} as const;
