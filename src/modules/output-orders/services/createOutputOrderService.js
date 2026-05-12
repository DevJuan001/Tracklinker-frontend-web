import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function createOutputOrderService(transformationData) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.outputOrders}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformationData),
    },
  );

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return await res.json();
}
