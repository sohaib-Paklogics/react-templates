export const QK = {
  me: () => ["auth", "me"] as const,
  users: () => ["users"] as const,
  user: (id: string) => ["users", "detail", id] as const,
} as const;
