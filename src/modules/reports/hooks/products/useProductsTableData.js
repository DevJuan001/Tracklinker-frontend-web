import { useEffect, useRef, useState } from "react";
import { getProductsTableDataService } from "../../services/products/getProductsTableDataService";

export function useProductsTableData() {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchUsersData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const response = await getProductsTableDataService(
          controllerRef.current.signal,
        );
        setProductsData(response);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchUsersData();
    return () => controllerRef.current?.abort();
  }, []);

  return { productsData, error };
}
