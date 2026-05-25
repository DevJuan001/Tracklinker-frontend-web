import { useEffect, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getProductsPieDataService } from "../../services/products/getProductsPieDataService";

export function useProductsPieData(period) {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const data = await getProductsPieDataService(period);

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));

        setProductsData(pieData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchProductsData();
  }, [period]);

  return { productsData, error };
}
