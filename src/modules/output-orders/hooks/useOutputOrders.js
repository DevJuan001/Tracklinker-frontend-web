import { useState } from "react";
import { getOutputOrdersService } from "../services/getOutputOrdersService";
import { useQuery } from "@tanstack/react-query";

export function useOutputOrders() {
  const [filters, setFilters] = useState({});

  const outputOrders = useQuery({
    queryKey: ["outputOrders", filters],
    queryFn: () => getOutputOrdersService(filters),
    staleTime: 1000 * 60 * 10,
  });

  return {
    outputOrders: outputOrders.data || [],
    loading: outputOrders.isLoading,
    error: outputOrders.error,
    filters,
    setFilters,
  };
}
