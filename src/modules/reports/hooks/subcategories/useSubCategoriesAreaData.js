import { useEffect, useState } from "react";
import { getSubcategoriesAreaChartService } from "../../services/subcategories/getSubcategoriesAreaChartService";
import { formatLabel } from "../../../../utils/formatLabel";

export function useSubcategoriesAreaData(period) {
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSubcategoriesData() {
      try {
        const response = await getSubcategoriesAreaChartService(period);

        const data = response.map((row) => ({
          month: formatLabel(row.date, period),
          subcategories: row.subcategories,
        }));

        setSubcategoriesData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchSubcategoriesData();
  }, [period]);

  return { subcategoriesData, error };
}
