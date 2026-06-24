import { useEffect, useState } from "react";
import { getOutputOrdersKpiDataService } from "../services/getOutputOrdersKpiDataService";

export function useOutputOrdersKpi() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOutputKpiData() {
      setLoading(true);
      try {
        const response = await getOutputOrdersKpiDataService();
        setOrders(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchOutputKpiData();
  }, []);

  return { orders, loading, error };
}
