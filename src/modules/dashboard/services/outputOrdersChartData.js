import { apiRoutes } from "../../../config/apiRoutes";
import { getToken } from "../../../utils/auth";

export async function outputOrdersChartData() {
  const res = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.dashboard}/output-orders`,
    {
      method: "GET",
      headers: {
        Authorization: getToken(),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error al intentar obtener las ordenes de salida");
  }

  const data = await res.json();

  return data.data;
}
