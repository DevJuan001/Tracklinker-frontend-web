import { useEffect, useRef, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getSubcategoriesPieDataService } from "../../services/subcategories/getSubcategoriesPieDataService";

export function useSubcategoriesPieData(period) {
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchSubcategoriesData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getSubcategoriesPieDataService(
          period,
          controllerRef.current.signal,
        );

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));
        setSubcategoriesData(pieData);
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
