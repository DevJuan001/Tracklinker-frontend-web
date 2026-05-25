import { useEffect, useState } from "react";
import { getProductsDataService } from "../../services/products/getProductsDataService";

export function useProductsData() {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const data = await getProductsDataService();
        setProductsData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchProductsData();
  }, []);

  return { productsData, error };
}
