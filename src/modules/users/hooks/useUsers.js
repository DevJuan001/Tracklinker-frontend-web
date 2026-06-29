import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsersService } from "../services/getUsersService";

export function useUsers() {
  const [filters, setFilters] = useState({});

  const users = useInfiniteQuery({
    queryKey: ["users", filters],
    queryFn: ({ pageParam }) => getUsersService({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 20 ? allPages.length + 1 : undefined,
    select: (data) =>
      data.pages.flatMap((page) =>
        page.map((warranty) => ({
          ...warranty,
        })),
      ),
    staleTime: 1000 * 60 * 10,
  });

  return {
    users: users.data || [],
    loading: users.isLoading,
    error: users.error,
    fetchNextPage: users.fetchNextPage,
    isFetchingNextPage: users.isFetchingNextPage,
    hasNextPage: users.hasNextPage,
    filters,
    setFilters,
  };
}
