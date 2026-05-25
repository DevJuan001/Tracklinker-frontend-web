import { apiRoutes } from "../../../../config/apiRoutes";
import { fetchWithAuth } from "../../../../utils/fetchWithAuth";

export async function getProductsPieDataService(period) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.reports}/get_products_by_brand/${period}`,
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
