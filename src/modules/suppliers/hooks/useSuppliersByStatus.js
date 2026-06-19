import { useQuery } from "@tanstack/react-query";
import { getSuppliersByStatusService } from "../services/getSuppliersByStatusService";

export function useSuppliersByStatus() {
  const query = useQuery({
    queryKey: ["suppliersByStatus"],
    queryFn: getSuppliersByStatusService,
    staleTime: 1000 * 60 * 10,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}
