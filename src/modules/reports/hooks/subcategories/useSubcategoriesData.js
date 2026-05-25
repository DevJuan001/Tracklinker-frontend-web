import { useEffect, useState } from "react";
import { getSubcategoriesDataService } from "../../services/subcategories/getSubcategoriesDataService";

export function useSubcategoriesData() {
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSubcategoriesData() {
      try {
        const data = await getSubcategoriesDataService();
        setSubcategoriesData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchSubcategoriesData();
  }, []);

  return { subcategoriesData, error };
}
