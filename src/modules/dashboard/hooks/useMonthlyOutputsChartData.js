import { useState, useEffect } from "react";
import { getMonthlyOutputsDataService } from "../services/getMonthlyOutputsDataService";

export function useMonthlyOutputsChartData() {
  const [monthlyOutputsData, setMonthlyOutputsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMonthlyOutputsData() {
      try {
        const data = await getMonthlyOutputsDataService();
        setMonthlyOutputsData(data);
      } catch (error) {
        setError(error);
      }
    }

    fetchMonthlyOutputsData();
  }, []);

  return { monthlyOutputsData, error };
}
