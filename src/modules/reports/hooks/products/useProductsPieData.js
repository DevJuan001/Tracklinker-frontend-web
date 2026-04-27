import { useEffect, useRef, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getProductsPieDataService } from "../../services/products/getProductsPieDataService";

export function useProductsPieData(period) {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchProductsData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getProductsPieDataService(
          period,
          controllerRef.current.signal,
        );

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));
        setProductsData(pieData);
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
