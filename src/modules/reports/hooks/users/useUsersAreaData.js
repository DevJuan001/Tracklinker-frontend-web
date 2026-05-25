import { useEffect, useState } from "react";
import { formatLabel } from "../../../../utils/formatLabel";
import { getUsersAreaChartService } from "../../services/users/getUsersAreaChartService";

export function useUsersAreaData(period) {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const response = await getUsersAreaChartService(period);

        const data = response.map((row) => ({
          month: formatLabel(row.date, period),
          users: row.users,
        }));

        setUsersData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsersData();
  }, [period]);

  return { usersData, error };
}
