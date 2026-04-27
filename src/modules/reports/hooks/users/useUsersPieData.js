import { useEffect, useRef, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getUsersPieDataService } from "../../services/users/getUsersPieDataService";

export function useUsersPieData(period) {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(false);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchUsersData() {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const data = await getUsersPieDataService(
          period,
          controllerRef.current.signal,
        );

        const pieData = data.map((item, index) => ({
          rol: item.rol_name,
          users: item.users,
          color: colors[index % colors.length],
        }));
        setUsersData(pieData);
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
