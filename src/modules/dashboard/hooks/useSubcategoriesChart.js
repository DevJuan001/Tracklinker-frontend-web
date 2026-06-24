import { useEffect, useState } from "react";
import { getSubcategoriesChartDataService } from "../services/getSubcategoriesChartDataService";

export function useSubcategoriesChart() {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubcategoriesChart() {
      try {
        const response = await getSubcategoriesChartDataService();
        setSubcategories(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubcategoriesChart()
  }, []);

  return {subcategories ,loading, error}
}
