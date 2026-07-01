import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import { getValueError } from "../../../utils/getValueError";

export async function createProductService(product_data) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.products}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product_data),
    },
  );

  const json = await response.json();

  const error = getValueError(json);

  if (!response.ok) {
    return {
      error: error || json.detail || "Error en la petición",
      data: null,
    };
  }

  return json;
}
