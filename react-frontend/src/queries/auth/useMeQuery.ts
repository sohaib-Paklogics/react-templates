import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export function useMeQuery() {
  const token = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: QUERY_KEYS.auth.me,
    queryFn: () => authService.me(),
    enabled: !!token,
  });
}
