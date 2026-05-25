import { apiRoutes } from "../../../../config/apiRoutes";
import { fetchWithAuth } from "../../../../utils/fetchWithAuth";

export async function getOutputsTableDataService() {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.reports}/get_recent_outputs`,
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
