import { useEffect, useState } from "react";
import { getSubcategoriesTableDataService } from "../../services/subcategories/getSubcategoriesTableDataService";

export function useSubcategoriesTableData() {
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSubcategoriesData() {
      try {
        const response = await getSubcategoriesTableDataService();
        setSubcategoriesData(response);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchSubcategoriesData();
  }, []);

  return { subcategoriesData, error };
}
