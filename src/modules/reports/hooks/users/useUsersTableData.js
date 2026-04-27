import { useEffect, useRef, useState } from "react";
import { getUsersTableDataService } from "../../services/users/getUsersTableDataService";

export function useUsersTableData() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchUsersData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getUsersTableDataService(
          controllerRef.current.signal,
        );
        setUsers(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchUsersData();
    return () => controllerRef.current?.abort();
  }, []);

  return { users, error };
}
