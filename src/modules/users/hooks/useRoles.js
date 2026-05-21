import { useQuery } from "@tanstack/react-query";
import { getRolesService } from "../services/getRolesService";

export function useRoles() {
  const roles = useQuery({
    queryKey: ["roles"],
    queryFn: async ({ signal }) => {
      return getRolesService(signal);
    },
    staleTime: 1000 * 60 * 30
  });

  return {
    roles: roles.data || [],
    loading: roles.isLoading,
    error: roles.error,
  };
}
