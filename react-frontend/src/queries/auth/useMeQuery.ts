import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useMeQuery() {
  const token = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authService.me(),
    enabled: !!token,
  });
}
