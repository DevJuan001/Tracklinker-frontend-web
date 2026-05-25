import { useEffect, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getWarrantiesAreaChartService } from "../../services/warranties/getWarrantiesAreaChartService";

export function useWarrantiesAreaData(period) {
  const [warrantiesData, setWarrantiesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWarrantiesData() {
      try {
        const response = await getWarrantiesAreaChartService(period);

        const data = response.map((row) => ({
          month: formatLabel(row.date, period),
          warranties: row.warranties,
        }));

        setWarrantiesData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchWarrantiesData();
  }, [period]);

  return { warrantiesData, error };
}
