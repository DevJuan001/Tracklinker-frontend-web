import { useEffect, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getOutputsPieDataService } from "../../services/outputs/getOutputsPieDataService";

export function useOutputsPieData(period) {
  const [outputsData, setOutputsData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchOutputsData() {
      try {
        const data = await getOutputsPieDataService(period);

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));

        setOutputsData(pieData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchOutputsData();
  }, [period]);

  return { outputsData, error };
}
