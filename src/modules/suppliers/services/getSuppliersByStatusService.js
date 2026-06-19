import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getSuppliersByStatusService() {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.reports}/get_suppliers_by_status`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Error al intentar obtener los proveedores por estado");
  }

  const data = await response.json();

  return data.data;
}
