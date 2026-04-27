import { useEffect, useRef, useState } from "react";
import { getOutputsDataService } from "../../services/outputs/getOutputsDataService";

export function useOutputsData() {
  const [outputsData, setOutputsData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchOutputsData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getOutputsDataService(controllerRef.current.signal);
        setOutputsData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchOutputsData();
    return () => controllerRef.current?.abort();
  }, []);

  return { outputsData, error };
}
