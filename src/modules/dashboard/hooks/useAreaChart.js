import { useState, useEffect } from "react";
import { getAreaChartDataService } from "../services/getAreaChartDataService";

export function useAreaChart() {
  const [areaChartInfo, setareaChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAreaChartData() {
      try {
        const data = await getAreaChartDataService();
        setareaChartData(data);
      } catch (error) {
        setError(error)
      }
    }

    fetchAreaChartData();
  }, []);

  return { areaChartInfo, error }
}
