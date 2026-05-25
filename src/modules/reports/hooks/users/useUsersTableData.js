import { useEffect, useState } from "react";
import { getUsersTableDataService } from "../../services/users/getUsersTableDataService";

export function useUsersTableData() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const data = await getUsersTableDataService();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUsersData();
  }, []);

  return { users, error };
}
