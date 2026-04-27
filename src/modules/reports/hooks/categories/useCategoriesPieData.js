import { useEffect, useRef, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getCategoriesPieDataService } from "../../services/categories/getCategoriesPieDataService";

export function useCategoriesPieData(period) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchCategoriesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getCategoriesPieDataService(
          period,
          controllerRef.current.signal,
        );

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));
        setCategoriesData(pieData);
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
