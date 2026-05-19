import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function editCategoryService(id, category_data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.categories}/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category_data),
    },
  );

  const json = await res.json();

  if (!res.ok) {
    return { error: json.detail || "Error en la petición", data: null };
  }

  return json;
}
