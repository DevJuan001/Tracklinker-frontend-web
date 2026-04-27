import { useEffect, useRef, useState } from "react";
import { getSubcategoriesTableDataService } from "../../services/subcategories/getSubcategoriesTableDataService";

export function useSubcategoriesTableData() {
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchSubcategoriesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const response = await getSubcategoriesTableDataService(
          controllerRef.current.signal,
        );
        setSubcategoriesData(response);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchSubcategoriesData();
    return () => controllerRef.current?.abort();
  }, []);

  return { subcategoriesData, error };
}
