import { useEffect, useRef, useState } from "react";
import { getProductsDataService } from "../../services/products/getProductsDataService";

export function useProductsData() {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchProductsData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getProductsDataService(controllerRef.current.signal);
        setProductsData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchProductsData();
    return () => controllerRef.current?.abort();
  }, []);

  return { productsData, error };
}
