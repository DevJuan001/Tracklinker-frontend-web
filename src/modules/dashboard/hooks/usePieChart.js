import { useState, useEffect } from "react";
import { pieChartData } from "../services/pieChartData";

export function usePieChart() {
  const [simplePieChartData, setSimplePieChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para almacenar la informacion del graficó en forma de pie
    async function fetchPieChartData() {
      try {
        const data = await pieChartData();
        // Almacenamos cada item de data dentro de un array de objetos para que sea usable con recharts
        const pieData = [
          { name: "Sin completar", value: data[0].total, color: "#2f3ab5" },
          { name: "En proceso", value: data[1].total, color: "#8c2fba" },
          { name: "Completadas", value: data[2].total, color: "#00a86b" }
        ];
        setSimplePieChartData(pieData);
      } catch (error) {
        setError(error);
      }
    }

    fetchPieChartData();
  }, []);
  return { simplePieChartData, error };
}
