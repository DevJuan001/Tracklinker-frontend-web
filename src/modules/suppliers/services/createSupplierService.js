import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function createSupplierService(supplier_data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.suppliers}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier_data),
    },
  );

  const json = await res.json();

  if (!res.ok) {
    return { error: json.detail || "Error en la petición", data: null };
  }

  return json;
}
