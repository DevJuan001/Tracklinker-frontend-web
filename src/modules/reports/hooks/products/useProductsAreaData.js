import { useEffect, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getProductsAreaChartService } from "../../services/products/getProductsAreaChartService";

export function useProductsAreaData(period) {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const response = await getProductsAreaChartService(period);

        const data = response.map((row) => ({
          month: formatLabel(row.date, period),
          products: row.products,
        }));

        setProductsData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchProductsData();
  }, [period]);

  return { productsData, error };
}
