import { useEffect, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getCategoriesPieDataService } from "../../services/categories/getCategoriesPieDataService";

export function useCategoriesPieData(period) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCategoriesData() {
      try {
        const data = await getCategoriesPieDataService(period);

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));

        setCategoriesData(pieData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCategoriesData();
  }, [period]);

  return { categoriesData, error };
}
