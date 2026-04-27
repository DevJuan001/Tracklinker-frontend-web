import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function categoriesChartData() {
  const res = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.dashboard}/categories`,
    {
      method: "GET",
      headers: {
        Authorization: getToken(),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener las categorias");
  }

  const data = await res.json();

  return data.data;
}
