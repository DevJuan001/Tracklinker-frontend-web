import { apiRoutes } from "../../../config/apiRoutes";
import { buildQueryParams } from "../../../utils/buildQueryParams";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getCategoriesService(filters = {}) {
  const params = buildQueryParams(filters);

  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.categories}/?${params}`,
    {
      method: "GET",
    },
  );

  const json = await res.json();

  if (!res.ok) {
    return { error: json.detail || "Error en la petición", data: null };
  }

  return json.data;
}
