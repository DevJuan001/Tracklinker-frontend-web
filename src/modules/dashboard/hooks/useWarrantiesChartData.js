import { useState, useEffect } from "react";
import { getWarrantiesDataService } from "../services/getWarrantiesDataService";

export function useWarrantiesChartData() {
  const [warrantiesChartData, setWarrantiesChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para almacenar la informacion del graficó en forma de pie
    async function fetchWarrantiesChartData() {
      try {
        const data = await getWarrantiesDataService();
        // Almacenamos cada item de data dentro de un array de objetos para que sea usable con recharts
        const pieData = [
          { name: "Sin completar", value: data[0]?.total, color: "#2f3ab5" },
          { name: "En proceso", value: data[1]?.total, color: "#8c2fba" },
          { name: "Completadas", value: data[2]?.total, color: "#00a86b" },
        ];
        setWarrantiesChartData(pieData);
      } catch (error) {
        setError(error);
      }
    }

    fetchWarrantiesChartData();
  }, []);
  return { warrantiesChartData, error };
}
