import { useEffect, useRef, useState } from "react";
import { getOutputsTableDataService } from "../../services/outputs/getOutputsTableDataService.js";

export function useOutputsTableData() {
  const [outputs, setOutputs] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchOutputsData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getOutputsTableDataService(
          controllerRef.current.signal,
        );
        setOutputs(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchOutputsData();
    return () => controllerRef.current?.abort();
  }, []);

  return { outputs, error };
}
