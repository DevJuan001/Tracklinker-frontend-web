import { useEffect, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getSuppliersPieDataService } from "../../services/suppliers/getSuppliersPieDataService.js";

export function useSuppliersPieData(period) {
  const [suppliersData, setSuppliersData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSuppliersData() {
      try {
        const data = await getSuppliersPieDataService(period);

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));

        setSuppliersData(pieData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchSuppliersData();
  }, [period]);

  return { suppliersData, error };
}
