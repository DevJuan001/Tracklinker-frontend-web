import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function disableCategoryService(id) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.categories}/disable/${id}`,
    {
      method: "PUT",
    },
  );

  const json = await res.json();

  if (!res.ok) {
    return { error: json.detail || "Error en la petición", data: null };
  }

  return json;
}
