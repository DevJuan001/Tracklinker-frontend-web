import { useEffect, useState } from "react";
import { getOutputsTableDataService } from "../../services/outputs/getOutputsTableDataService.js";

export function useOutputsTableData() {
  const [outputs, setOutputs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchOutputsData() {
      try {
        const data = await getOutputsTableDataService();
        setOutputs(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchOutputsData();
  }, []);

  return { outputs, error };
}
