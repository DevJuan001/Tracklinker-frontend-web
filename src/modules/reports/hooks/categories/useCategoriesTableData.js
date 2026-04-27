import { useEffect, useRef, useState } from "react";
import { getCategoriesTableDataService } from "../../services/categories/getCategoriesTableDataService";

export function useCategoriesTableData() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchUsersData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const response = await getCategoriesTableDataService(
          controllerRef.current.signal,
        );
        setCategoriesData(response);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchUsersData();
    return () => controllerRef.current?.abort();
  }, []);

  return { categoriesData, error };
}
