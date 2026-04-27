import { useEffect, useRef, useState } from "react";
import { getUsersDataService } from "../../services/users/getUsersDataService";

export function useUsersData() {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchUsersData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getUsersDataService(controllerRef.current.signal);
        setUsersData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchUsersData();
    return () => controllerRef.current?.abort();
  }, []);

  return { usersData, error };
}
