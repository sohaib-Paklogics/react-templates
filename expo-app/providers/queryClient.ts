import { QueryClient } from "@tanstack/react-query";
import type { ApiError } from "../lib/types/api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const e = error as ApiError | undefined;
        if (e?.status === 401) return false;
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});
