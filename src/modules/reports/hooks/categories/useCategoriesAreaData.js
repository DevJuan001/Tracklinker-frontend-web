import { useEffect, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getCategoriesAreaChartService } from "../../services/categories/getCategoriesAreaChartService";

export function useCategoriesAreaData(period) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCategoriesData() {
      try {
        const response = await getCategoriesAreaChartService(period);

        const data = response.map((row) => ({
          month: formatLabel(row.date, period),
          categories: row.categories,
        }));

        setCategoriesData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCategoriesData();
  }, [period]);

  return { categoriesData, error };
}
