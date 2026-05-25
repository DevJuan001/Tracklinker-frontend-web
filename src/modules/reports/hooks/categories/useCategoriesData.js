import { useEffect, useState } from "react";
import { getCategoriesDataService } from "../../services/categories/getCategoriesDataService";

export function useCategoriesData() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCategoriesData() {
      try {
        const data = await getCategoriesDataService();
        setCategoriesData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCategoriesData();
  }, []);

  return { categoriesData, error };
}
