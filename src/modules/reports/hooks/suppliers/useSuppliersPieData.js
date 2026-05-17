import { useEffect, useRef, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getSuppliersPieDataService } from "../../services/suppliers/getSuppliersPieDataService.js";

export function useSuppliersPieData(period) {
  const [suppliersData, setSuppliersData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchSuppliersData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getSuppliersPieDataService(
          period,
          controllerRef.current.signal,
        );

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));
        setSuppliersData(pieData);
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
