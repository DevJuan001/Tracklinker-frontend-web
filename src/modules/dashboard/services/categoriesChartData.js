import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function categoriesChartData() {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.dashboard}/categories`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Error al obtener las categorias");
  }

  const data = await res.json();

  return data.data;
}
