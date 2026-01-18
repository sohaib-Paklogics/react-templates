import { useQuery } from "@tanstack/react-query";
import { usersService } from "../../services/users/users.service";

export function useUserQuery(id: string) {
  return useQuery({
    queryKey: ["users", "detail", id],
    queryFn: () => usersService.byId(id),
    enabled: !!id,
  });
}
