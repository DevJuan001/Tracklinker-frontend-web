// Hooks
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// Services
import { getProductsService } from "../services/getProductsService";
import { getInputOrdersService } from "../services/getInputOrdersService";
import { getProductStatusService } from "../services/getProductStatusService";
import { getProductBrandsService } from "../services/getProductBrandsService";
import { getProductModelsService } from "../services/getProductModelsService";
import { getCategoriesService } from "../../categories/services/getCategoriesService";
import { getSubcategories } from "../../subcategories/services/getSubcategoriesService";
// Status
import { productStatusConfig } from "../constants/productStatusConfig";

export function useCatalog() {
  const [filters, setFilters] = useState([]);

  const products = useQuery({
    queryKey: ["products", filters],
    queryFn: ({ signal }) => getProductsService(filters, signal),
    select: (data) =>
      data.map((product) => ({
        ...product,
        status_text: productStatusConfig[product.status]?.text,
      })),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 20,
    refetchIntervalInBackground: false,
  });

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesService,
    select: (data) => data ?? [],
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 20,
    refetchIntervalInBackground: false,
  });

  const subcategories = useQuery({
    queryKey: ["subcategories"],
    queryFn: getSubcategories,
    select: (data) => data ?? [],
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 20,
    refetchIntervalInBackground: false,
  });

  const brands = useQuery({
    queryKey: ["brands"],
    queryFn: getProductBrandsService,
    select: (data) => data ?? [],
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 20,
    refetchIntervalInBackground: false,
  });

  const models = useQuery({
    queryKey: ["models"],
    queryFn: getProductModelsService,
    select: (data) => data ?? [],
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 20,
    refetchIntervalInBackground: false,
  });

  const inputOrders = useQuery({
    queryKey: ["inputOrders"],
    queryFn: getInputOrdersService,
    select: (data) => data ?? [],
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 20,
    refetchIntervalInBackground: false,
  });

  const productStatus = useQuery({
    queryKey: ["productStatus"],
    queryFn: getProductStatusService,
    select: (data) => data ?? [],
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 20,
    refetchIntervalInBackground: false,
  });

  return {
    products: products.data || [],
    categories: categories.data || [],
    subcategories: subcategories.data || [],
    brands: brands.data || [],
    models: models.data || [],
    inputOrders: inputOrders.data || [],
    productStatus: productStatus.data || [],
    loading:
      products.isLoading ||
      categories.isLoading ||
      subcategories.isLoading ||
      brands.isLoading ||
      models.isLoading ||
      inputOrders.isLoading ||
      productStatus.isLoading,
    error:
      products.error ||
      categories.error ||
      subcategories.error ||
      brands.error ||
      models.error ||
      inputOrders.error ||
      productStatus.error,
    filters,
    setFilters,
  };
}
