import { useEffect, useState } from "react";
import { colors } from "../../../../utils/colors";
import { getUsersPieDataService } from "../../services/users/getUsersPieDataService";

export function useUsersPieData(period) {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const data = await getUsersPieDataService(period);

        const pieData = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length],
        }));

        setUsersData(pieData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsersData();
  }, [period]);

  return { usersData, error };
}
