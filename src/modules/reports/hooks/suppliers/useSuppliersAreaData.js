import { useEffect, useRef, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getSuppliersAreaChartService } from "../../services/suppliers/getSuppliersAreaChartService";

export function useSuppliersAreaData(period) {
  const [suppliersData, setSuppliersData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchSuppliersData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const response = await getSuppliersAreaChartService(
          period,
          controllerRef.current.signal,
        );
        const data = response.map((row) => ({
          month: formatLabel(row.label, period),
          suppliers: row.suppliers,
        }));
        setSuppliersData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchSuppliersData();
    return () => controllerRef.current?.abort();
  }, [period]);

  return { suppliersData, error };
}
