import { useEffect, useState } from "react";
import { outputOrdersChartData } from "../services/outputOrdersChartData";

export function useOutputOrdersChart() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOutputChartData() {
      setLoading(true);
      try {
        const response = await outputOrdersChartData();
        setOrders(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchOutputChartData();
  }, []);

  return { orders, loading, error };
}
