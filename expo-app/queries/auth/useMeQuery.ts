import { useQuery } from "@tanstack/react-query";
import { authService } from "../../services/auth/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { QK } from "@/constants/queryKeys

export function useMeQuery() {
  const token = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: QK.me(),
    queryFn: authService.me,
    enabled: !!token,
  });
}
