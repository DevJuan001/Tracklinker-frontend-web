import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function outputOrdersChartData() {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.dashboard}/output-orders`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Error al intentar obtener las ordenes de salida");
  }

  const data = await res.json();

  return data.data;
}
