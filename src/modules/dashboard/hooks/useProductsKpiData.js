import { useState, useEffect } from "react";
import { getProductsKpiDataService } from "../services/getProductsKpiDataService"

export function useProductsKpiData() {
  const [productChartInfo, setProductChartInfo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    // Función para almacenar la informacion del grafico
    async function fetchProductsData() {
      try {
        const data = await getProductsKpiDataService();
        setProductChartInfo(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    fetchProductsData();
  }, []);
  return { productChartInfo, loading, error };
}
