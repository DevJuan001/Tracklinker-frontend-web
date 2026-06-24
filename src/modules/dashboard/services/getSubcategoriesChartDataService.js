import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getSubcategoriesChartDataService() {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.dashboard}/subcategories-with-stock`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Error al intentar obtener las subcategorias");
  }

  const data = await res.json();

  return data.data;
}
