import { useQuery } from "@tanstack/react-query";
import { getOutputOrdersByStatusService } from "../services/getOutputOrdersByStatusService";

export function useOutputOrdersByStatus() {
  const query = useQuery({
    queryKey: ["outputOrdersByStatus"],
    queryFn: getOutputOrdersByStatusService,
    staleTime: 1000 * 60 * 10,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}
