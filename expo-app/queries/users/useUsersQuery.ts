import { useQuery } from "@tanstack/react-query";
import { usersService } from "../../services/users/users.service";
import { QK } from "../../constants/queryKeys";

export function useUsersQuery(params?: { q?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: QK.users(params),
    queryFn: () => usersService.list(params),
  });
}
