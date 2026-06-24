import { useEffect, useState } from "react";
import { getBarChartDataService } from "../services/getBarChartDataService";

export default function useBarChartData() {
  const [barChartData, setBarChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para almacenar la informacion del graficó de barras pequeño
    async function fetchBarChartData() {
      try {
        const data = await getBarChartDataService();
        setBarChartData(data);
      } catch (error) {
        setError(error);
      }
    }

    fetchBarChartData();
  }, []);

  return { barChartData, error };
}
