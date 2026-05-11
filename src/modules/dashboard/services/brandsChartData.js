import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function brandsChartData() {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.dashboard}/stock_by_brand`,
    {
      method: "GET",
    },
  );
  
  // Validamos si la respuesta fue OK
  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  // Convertimos la respuesta a json y la almacenamos en data
  const data = await res.json();

  // Retornamos la información para el gráfico
  return data.data;
}
