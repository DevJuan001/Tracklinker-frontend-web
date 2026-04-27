import { useEffect, useRef, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getUsersAreaChartService } from "../../services/users/getUsersAreaChartService";

export function useUsersAreaData(period) {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchUsersData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const response = await getUsersAreaChartService(
          period,
          controllerRef.current.signal,
        );
        const data = response.map((row) => ({
          month: formatLabel(row.label, period),
          users: row.users,
        }));
        setUsersData(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    }

    fetchUsersData();
    return () => controllerRef.current?.abort();
  }, [period]);

  return { usersData, error };
}
