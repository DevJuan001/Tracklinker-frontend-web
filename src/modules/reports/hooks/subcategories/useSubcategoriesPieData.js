import { useEffect, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getSubcategoriesPieDataService } from "../../services/subcategories/getSubcategoriesPieDataService";

export function useSubcategoriesPieData(period) {
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSubcategoriesData() {
      try {
        const data = await getSubcategoriesPieDataService(period);

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));

        setSubcategoriesData(pieData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchSubcategoriesData();
  }, [period]);

  return { subcategoriesData, error };
}
