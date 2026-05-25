import { useEffect, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getWarrantiesPieDataService } from "../../services/warranties/getWarrantiesPieDataService";

export function useWarrantiesPieData(period) {
  const [warrantiesData, setWarrantiesData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWarrantiesData() {
      try {
        const data = await getWarrantiesPieDataService(period);

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));

        setWarrantiesData(pieData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchWarrantiesData();
  }, [period]);

  return { warrantiesData, error };
}
