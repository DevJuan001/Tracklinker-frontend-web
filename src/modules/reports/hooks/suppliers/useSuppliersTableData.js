import { useEffect, useRef, useState } from "react";
import { getSuppliersTableDataService } from "../../services/suppliers/getSuppliersTableDataService.js";

export function useSuppliersTableData() {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchSuppliersData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getSuppliersTableDataService(
          controllerRef.current.signal,
        );
        setSuppliers(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchSuppliersData();
    return () => controllerRef.current?.abort();
  }, []);

  return { suppliers, error };
}
