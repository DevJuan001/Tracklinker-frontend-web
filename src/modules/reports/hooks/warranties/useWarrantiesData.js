import { useEffect, useState } from "react";
import { getWarrantiesDataService } from "../../services/warranties/getWarrantiesDataService";

export function useWarrantiesData() {
  const [warrantiesData, setWarrantiesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWarrantiesData() {
      try {
        const data = await getWarrantiesDataService();
        setWarrantiesData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchWarrantiesData();
  }, []);

  return { warrantiesData, error };
}
