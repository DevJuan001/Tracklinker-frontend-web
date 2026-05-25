import { useEffect, useState } from "react";
import { getCategoriesTableDataService } from "../../services/categories/getCategoriesTableDataService";

export function useCategoriesTableData() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const response = await getCategoriesTableDataService();
        setCategoriesData(response);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsersData();
  }, []);

  return { categoriesData, error };
}
