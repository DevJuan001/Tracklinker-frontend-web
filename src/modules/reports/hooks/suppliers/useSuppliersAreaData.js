import { useEffect, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getSuppliersAreaChartService } from "../../services/suppliers/getSuppliersAreaChartService";

export function useSuppliersAreaData(period) {
  const [suppliersData, setSuppliersData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSuppliersData() {
      try {
        const response = await getSuppliersAreaChartService(period);

        const data = response.map((row) => ({
          month: formatLabel(row.date, period),
          suppliers: row.suppliers,
        }));

        setSuppliersData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchSuppliersData();
  }, [period]);

  return { suppliersData, error };
}
