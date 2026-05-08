import { useQuery } from "@tanstack/react-query";
import { getCurrentUserService } from "../services/getCurrentUserService";

export function useUser() {
  const user = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserService,
    staleTime: 1000 * 60 * 60,
  });

  return { user: user.data?.data?.[0] || [], error: user.error };
}
