import { apiRoutes } from "../../config/apiRoutes";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export async function createClientService(clientData) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.users}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    },
  );

  const json = await response.json();

  if (!response.ok) {
    return { error: json.detail || "Error en la petición", data: null };
  }

  return json;
}
