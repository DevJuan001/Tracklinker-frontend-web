import { useEffect, useState } from "react";
import { getCategoriesKpiDataService } from "../services/getCategoriesKpiDataService";

export function useCategoriesKpiData() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategoriesKpiData() {
      setLoading(true);
      try {
        const response = await getCategoriesKpiDataService();
        setCategories(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoriesKpiData();
  }, []);

  return { categories, loading, error };
}
