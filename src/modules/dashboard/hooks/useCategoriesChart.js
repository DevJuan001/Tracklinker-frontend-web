import { useEffect, useState } from "react";
import { categoriesChartData } from "../services/categoriesChartData";

export function useCategoriesChart() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategoriesChartData() {
      setLoading(true);
      try {
        const response = await categoriesChartData();
        setCategories(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoriesChartData();
  }, []);

  return { categories, loading, error };
}
