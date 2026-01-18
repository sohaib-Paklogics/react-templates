import { useQuery } from "@tanstack/react-query";
import { usersService } from "../../services/users/users.service";
import { QK } from "../../constants/queryKeys";

export function useUserQuery(id: string) {
  return useQuery({
    queryKey: QK.user(id),
    queryFn: () => usersService.byId(id),
    enabled: !!id,
  });
}
