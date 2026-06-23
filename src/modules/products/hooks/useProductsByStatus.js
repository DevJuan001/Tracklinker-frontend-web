import { useQuery } from "@tanstack/react-query";
import { getProductsByStatusService } from "../services/getProductsByStatusService";

export function useProductsByStatus() {
  const query = useQuery({
    queryKey: ["productsByStatus"],
    queryFn: getProductsByStatusService,
    staleTime: 1000 * 60 * 10,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}