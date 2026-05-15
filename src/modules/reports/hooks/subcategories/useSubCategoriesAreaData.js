import { useEffect, useRef, useState } from "react";
import { getSubcategoriesAreaChartService } from "../../services/subcategories/getSubcategoriesAreaChartService";
import { formatLabel } from "../../../../utils/formatLabel";

export function useSubcategoriesAreaData(period) {
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchSubcategoriesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const response = await getSubcategoriesAreaChartService(
          period,
          controllerRef.current.signal,
        );
        const data = response.map((row) => ({
          month: formatLabel(row.date, period),
          subcategories: row.subcategories,
        }));
        setSubcategoriesData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchSubcategoriesData();
    return () => controllerRef.current?.abort();
  }, [period]);

  return { subcategoriesData, error };
}
