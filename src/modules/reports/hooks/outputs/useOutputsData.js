import { useEffect, useState } from "react";
import { getOutputsDataService } from "../../services/outputs/getOutputsDataService";

export function useOutputsData() {
  const [outputsData, setOutputsData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchOutputsData() {
      try {
        const data = await getOutputsDataService();
        setOutputsData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchOutputsData();
  }, []);

  return { outputsData, error };
}
