import { useQuery } from "@tanstack/react-query";
import { getActiveCategoriesService } from "../services/getActiveCategoriesService";

export function useActiveCategories() {
  const categories = useQuery({
    queryKey: ["activeCategories"],
    queryFn: getActiveCategoriesService,
    staleTime: 1000 * 60 * 10,
  });

  return {
    categories: categories.data || [],
    loading: categories.isLoading,
    error: categories.error,
  };
}
