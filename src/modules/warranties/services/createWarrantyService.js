import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import { getValueError } from "../../../utils/getValueError";

export async function createWarrantyService(data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.warranties}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const json = await res.json();

  const error = getValueError(json);

  if (!res.ok) {
    return {
      error: error || json.detail || "Error en la petición",
      data: null,
    };
  }

  return json;
}
