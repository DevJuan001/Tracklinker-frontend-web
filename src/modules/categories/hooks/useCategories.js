import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "../services/getCategoriesService";
import { useState } from "react";

export function useCategories() {
  const [filters, setFilters] = useState([]);

  const categories = useQuery({
    queryKey: ["categories", filters],
    queryFn: () => getCategoriesService(filters),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 35,
    refetchIntervalInBackground: false,
  });

  return {
    categories: categories.data || [],
    loading: categories.isLoading,
    error: categories.error,
    filters,
    setFilters,
  };
}
