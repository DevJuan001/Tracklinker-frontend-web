import { useEffect, useState } from "react";
import { tinyBarChartData } from "../services/barChartData";

export default function useBarChartData() {
  const [barChartData, setBarChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para almacenar la informacion del graficó de barras pequeño
    async function fetchBarChartData() {
      try {
        const data = await tinyBarChartData();
        setBarChartData(data);
      } catch (error) {
        setError(error);
      }
    }

    fetchBarChartData();
  }, []);

  return { barChartData, error };
}
