import { useState, useEffect } from "react";
import { usersChartData } from "../services/usersChartData";

export function useUsersChart() {
  const [usersChartInfo, setUsersChartInfo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    // Función para almacenar la informacion del grafico
    async function fetchUsersData() {
      try {
        const data = await usersChartData();
        setUsersChartInfo(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    fetchUsersData();
  }, []);
  return { usersChartInfo, loading, error };
}
