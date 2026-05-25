import { useEffect, useState } from "react";
import { getProductsTableDataService } from "../../services/products/getProductsTableDataService";

export function useProductsTableData() {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const response = await getProductsTableDataService();
        setProductsData(response);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsersData();
  }, []);

  return { productsData, error };
}
