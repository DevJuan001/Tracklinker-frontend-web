import { useEffect, useRef, useState } from "react";
import { getCategoriesDataService } from "../../services/categories/getCategoriesDataService";

export function useCategoriesData() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchCategoriesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getCategoriesDataService(
          controllerRef.current.signal,
        );
        setCategoriesData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchCategoriesData();
    return () => controllerRef.current?.abort();
  }, []);

  return { categoriesData, error };
}
