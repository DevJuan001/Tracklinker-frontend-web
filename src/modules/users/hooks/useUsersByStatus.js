import { useQuery } from "@tanstack/react-query";
import { getUsersByStatusService } from "../services/getUsersByStatusService";

export function useUsersByStatus() {
  const query = useQuery({
    queryKey: ["UsersByStatus"],
    queryFn: getUsersByStatusService,
    staleTime: 1000 * 60 * 10,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}
