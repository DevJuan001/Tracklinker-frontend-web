import { useEffect, useState } from "react";
import { getUsersDataService } from "../../services/users/getUsersDataService";

export function useUsersData() {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const data = await getUsersDataService();
        setUsersData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsersData();
  }, []);

  return { usersData, error };
}
