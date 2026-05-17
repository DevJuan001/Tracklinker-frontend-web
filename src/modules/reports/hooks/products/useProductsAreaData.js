import { useEffect, useRef, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getProductsAreaChartService } from "../../services/products/getProductsAreaChartService";

export function useProductsAreaData(period) {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchProductsData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const response = await getProductsAreaChartService(
          period,
          controllerRef.current.signal,
        );
        const data = response.map((row) => ({
          month: formatLabel(row.date, period),
          products: row.products,
        }));
        setProductsData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchProductsData();
    return () => controllerRef.current?.abort();
  }, [period]);

  return { productsData, error };
}
