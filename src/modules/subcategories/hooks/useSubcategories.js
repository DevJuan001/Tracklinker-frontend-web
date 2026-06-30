import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSubcategoriesService } from "../services/getSubcategoriesService";

export function useSubcategories() {
  const [filters, setFilters] = useState({});
  const subcategories = useInfiniteQuery({
    queryKey: ["subcategories", filters],
    queryFn: ({ pageParam }) => getSubcategoriesService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 20 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((category) => ({
          ...category,
        })),
      ),
    staleTime: 1000 * 60 * 10,
  });

  return {
    subcategories: subcategories.data || [],
    loading: subcategories.isLoading,
    error: subcategories.error,
    hasNextPage: subcategories.hasNextPage,
    fetchNextPage: subcategories.fetchNextPage,
    isFetchingNextPage: subcategories.isFetchingNextPage,
    filters,
    setFilters,
  };
}
