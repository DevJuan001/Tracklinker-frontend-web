import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function disableWarrantyService(warranty_id, product_serial) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.warranties}/update/${warranty_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_serial: product_serial, status: 1 }),
    },
  );

  const json = await res.json();

  if (!res.ok) {
    return { error: json.detail || "Error en la petición", data: null };
  }

  return json;
}
