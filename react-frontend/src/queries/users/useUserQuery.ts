import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/users/users.service";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";

export function useUserQuery(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.users.detail(id),
    queryFn: () => usersService.byId(id),
    enabled: !!id,
  });
}
