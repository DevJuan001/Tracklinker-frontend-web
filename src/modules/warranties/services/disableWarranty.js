import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function disableWarranty(warrantyId) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.warranties}/disable/${warrantyId}`,
    {
      method: "PUT",
    },
  );

  // Validamos si la respuesta no fue OK
  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  // Si la API devuelve un cuerpo JSON (por ejemplo, un mensaje de éxito)
  return await res.json();
}
