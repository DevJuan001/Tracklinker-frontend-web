import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function updateOutputOrderService(id, data) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.outputOrders}/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const json = await response.json();

  if (!response.ok) {
    return { error: json.detail || "Error en la petición", data: null };
  }

  return json;
}
