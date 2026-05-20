import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function editSupplierService(supplier_id, supplier_data) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.suppliers}/update/${supplier_id}`,
    {
      method: "PUT",
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
