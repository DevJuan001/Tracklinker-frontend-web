import { useEffect, useState } from "react";
import { getSuppliersDataService } from "../../services/suppliers/getSuppliersDataService";

export function useSuppliersData() {
  const [suppliersData, setSuppliersData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSuppliersData() {
      try {
        const data = await getSuppliersDataService();
        setSuppliersData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchSuppliersData();
  }, []);

  return { suppliersData, error };
}
