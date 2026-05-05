import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function disableWarranty(warranty_id, product_serial) {
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

  // Validamos si la respuesta no fue OK
  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  // Si la API devuelve un cuerpo JSON (por ejemplo, un mensaje de éxito)
  return await res.json();
}
