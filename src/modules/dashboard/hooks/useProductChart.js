import { useState, useEffect } from "react";
import { productsChartData } from "../services/productsChartData"

export function useProductChart() {
  const [productChartInfo, setProductChartInfo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    // Función para almacenar la informacion del grafico
    async function fetchProductsData() {
      try {
        const data = await productsChartData();
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
