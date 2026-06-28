import { useState } from "react";
import { getWarrantiesService } from "../services/getWarrantiesService";
import { useQuery } from "@tanstack/react-query";

export function useWarranties() {
  const [filters, setFilters] = useState({});

  const warranties = useQuery({
    queryKey: ["warranties", filters],
    queryFn: ({ pageParam }) => getWarrantiesService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 20 ? allPages.length + 1 : undefined,
    staleTime: 1000 * 20,
    refetchInterval: 1000 * 20,
    refetchIntervalInBackground: false,
  });

  return {
    warranties: warranties.data || [],
    loading: warranties.isLoading,
    error: warranties.error,
    fetchNextPage: warranties.fetchNextPage,
    hasNextPage: warranties.hasNextPage,
    isFetchingNextPage: warranties.isFetchingNextPage,
    filters,
    setFilters,
  };
}
