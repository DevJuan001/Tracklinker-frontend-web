import { useEffect, useState } from "react";
import { getMonthlyInputsService } from "../services/getMonthlyInputsService";

export function useMonthlyInputsChartData() {
  const [monthlyInputsData, setMonthlyInputsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMonthlyInputsData() {
      try {
        const data = await getMonthlyInputsService();
        setMonthlyInputsData(data);
      } catch (error) {
        setError(error);
      }
    }

    fetchMonthlyInputsData();
  }, []);

  return { monthlyInputsData, error };
}
