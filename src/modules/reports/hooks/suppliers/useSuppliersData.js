import { useEffect, useRef, useState } from "react";
import { getSuppliersDataService } from "../../services/suppliers/getSuppliersDataService";

export function useSuppliersData() {
  const [suppliersData, setSuppliersData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchSuppliersData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getSuppliersDataService(
          controllerRef.current.signal,
        );
        setSuppliersData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchSuppliersData();
    return () => controllerRef.current?.abort();
  }, []);

  return { suppliersData, error };
}
