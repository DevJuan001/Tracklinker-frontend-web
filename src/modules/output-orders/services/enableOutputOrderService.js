import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function enableOutputOrderService(id) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.outputOrders}/enable/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return await res.json();
}
