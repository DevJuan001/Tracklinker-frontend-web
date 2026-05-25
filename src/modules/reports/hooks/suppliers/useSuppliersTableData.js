import { useEffect, useState } from "react";
import { getSuppliersTableDataService } from "../../services/suppliers/getSuppliersTableDataService.js";

export function useSuppliersTableData() {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSuppliersData() {
      try {
        const data = await getSuppliersTableDataService();

        setSuppliers(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchSuppliersData();
  }, []);

  return { suppliers, error };
}
