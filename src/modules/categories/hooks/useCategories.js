import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategoriesService } from "../services/getCategoriesService";

export function useCategories() {
  const [filters, setFilters] = useState([]);

  const categories = useInfiniteQuery({
    queryKey: ["categories", filters],
    queryFn: ({ pageParam }) => getCategoriesService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 20 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((category) => ({
          ...category,
        })),
      ),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 35,
    refetchIntervalInBackground: false,
  });

  return {
    categories: categories.data || [],
    loading: categories.isLoading,
    fetchNextPage: categories.fetchNextPage,
    hasNextPage: categories.hasNextPage,
    isFetchingNextPage: categories.isFetchingNextPage,
    error: categories.error,
    filters,
    setFilters,
  };
}
