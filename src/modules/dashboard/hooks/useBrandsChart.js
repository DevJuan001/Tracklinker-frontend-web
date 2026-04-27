import { useState, useEffect } from "react";
import { brandsChartData } from "../services/brandsChartData";

export function useBrandsChart() {
  const [brandChartInfo, setBrandChartInfo] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
      // Función para almacenar la informacion del graficó de barras pequeño
      async function fetchBarChartData() {
        try {
          const data = await brandsChartData();
          setBrandChartInfo(data);
        } catch (error) {
          setError(error);
        }
      }
  
      fetchBarChartData();
    }, []);
  
    return { brandChartInfo, error };
}
