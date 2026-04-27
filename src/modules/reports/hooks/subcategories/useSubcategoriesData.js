import { useEffect, useRef, useState } from "react";
import { getSubcategoriesDataService } from "../../services/subcategories/getSubcategoriesDataService";

export function useSubcategoriesData() {
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchSubcategoriesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getSubcategoriesDataService(
          controllerRef.current.signal,
        );
        setSubcategoriesData(data);
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
