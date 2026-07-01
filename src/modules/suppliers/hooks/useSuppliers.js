import { useState } from "react";
import { getSuppliersService } from "../services/getSuppliersService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useSuppliers() {
  const [filters, setFilters] = useState({});

  const suppliers = useInfiniteQuery({
    queryKey: ["suppliers", filters],
    queryFn: ({ pageParam }) => getSuppliersService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 20 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((supplier) => ({
          ...supplier,
        })),
      ),
    staleTime: 1000 * 60 * 10,
  });

  return {
    suppliers: suppliers.data || [],
    loading: suppliers.isLoading,
    fetchNextPage: suppliers.fetchNextPage,
    hasNextPage: suppliers.hasNextPage,
    isFetchingNextPage: suppliers.isFetchingNextPage,
    error: suppliers.error,
    filters,
    setFilters,
  };
}
