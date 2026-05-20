import { useState } from "react";
import { getWarrantiesService } from "../services/getWarrantiesService";
import { useQuery } from "@tanstack/react-query";

export function useWarranties() {
  const [filters, setFilters] = useState({});

  const warranties = useQuery({
    queryKey: ["warranties", filters],
    queryFn: () => getWarrantiesService(filters),
    staleTime: 1000 * 60 * 10,
  });

  return {
    warranties: warranties.data || [],
    loading: warranties.isLoading,
    error: warranties.error,
    filters,
    setFilters,
  };
}
