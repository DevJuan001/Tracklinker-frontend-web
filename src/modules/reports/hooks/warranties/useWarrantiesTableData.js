import { useEffect, useState } from "react";
import { getWarrantiesTableDataService } from "../../services/warranties/getWarrantiesTableDataService";

export function useWarrantiesTableData() {
  const [warranties, setWarranties] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWarrantiesData() {
      try {
        const data = await getWarrantiesTableDataService();
        setWarranties(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchWarrantiesData();
  }, []);

  return { warranties, error };
}
