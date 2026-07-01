import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getOutputOrdersService } from "../services/getOutputOrdersService";

export function useOutputOrders() {
  const [filters, setFilters] = useState({});

  const outputOrders = useInfiniteQuery({
    queryKey: ["outputOrders", filters],
    queryFn: ({ pageParam }) => getOutputOrdersService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 20 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((outputOrder) => ({
          ...outputOrder,
        })),
      ),
    staleTime: 1000 * 60 * 10,
  });

  return {
    outputOrders: outputOrders.data || [],
    loading: outputOrders.isLoading,
    fetchNextPage: outputOrders.fetchNextPage,
    hasNextPage: outputOrders.hasNextPage,
    isFetchingNextPage: outputOrders.isFetchingNextPage,
    error: outputOrders.error,
    filters,
    setFilters,
  };
}
