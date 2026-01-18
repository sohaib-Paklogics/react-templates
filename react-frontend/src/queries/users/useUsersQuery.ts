import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/users/users.service";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export function useUsersQuery(params?: { q?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: QUERY_KEYS.users.list(params),
    queryFn: () => usersService.list(params),
  });
}
