import { useEffect, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getOutputsAreaChartService } from "../../services/outputs/getOutputsAreaChartService";

export function useOutputsAreaData(period) {
  const [outputsData, setOutputsData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchOutputsData() {
      try {
        const response = await getOutputsAreaChartService(period);

        const data = response.map((row) => ({
          month: formatLabel(row.date, period),
          outputs: row.output_orders,
        }));

        setOutputsData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchOutputsData();
  }, [period]);

  return { outputsData, error };
}
