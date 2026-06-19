import { useQuery } from "@tanstack/react-query";
import { getWarrantiesByStatusService } from "../services/getWarrantiesByStatusService";

export function useWarrantiesByStatus() {
  const query = useQuery({
    queryKey: ["warrantiesByStatus"],
    queryFn: getWarrantiesByStatusService,
    staleTime: 1000 * 60 * 10,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}
