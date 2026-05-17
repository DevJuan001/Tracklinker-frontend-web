import { useEffect, useRef, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getCategoriesAreaChartService } from "../../services/categories/getCategoriesAreaChartService";

export function useCategoriesAreaData(period) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchCategoriesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const response = await getCategoriesAreaChartService(
          period,
          controllerRef.current.signal,
        );
        const data = response.map((row) => ({
          month: formatLabel(row.date, period),
          categories: row.categories,
        }));
        setCategoriesData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchCategoriesData();
    return () => controllerRef.current?.abort();
  }, [period]);

  return { categoriesData, error };
}
