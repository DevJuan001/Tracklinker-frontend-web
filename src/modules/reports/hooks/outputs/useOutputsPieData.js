import { useEffect, useRef, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getOutputsPieDataService } from "../../services/outputs/getOutputsPieDataService";

export function useOutputsPieData(period) {
  const [outputsData, setOutputsData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchOutputsData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getOutputsPieDataService(
          period,
          controllerRef.current.signal,
        );

        const pieData = data.map((item, index) => ({
          name: item.name,
          value: item.value,
          color: colors[index % colors.length],
        }));
        setOutputsData(pieData);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchOutputsData();
    return () => controllerRef.current?.abort();
  }, [period]);

  return { outputsData, error };
}
