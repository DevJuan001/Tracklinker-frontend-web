import { apiRoutes } from "../../../../config/apiRoutes";
import { fetchWithAuth } from "../../../../utils/fetchWithAuth";

export async function getSuppliersTableDataService() {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.reports}/get_recent_suppliers`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  const data = await response.json();

  return data.data;
}
