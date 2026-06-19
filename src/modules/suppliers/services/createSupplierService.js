import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function createSupplierService(supplier_data) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.suppliers}/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier_data),
    },
  );

  const json = await response.json();

  if (!response.ok) {
    const emailError = Array.isArray(json.detail)
      ? json.detail.map((err) =>
          err.msg.replace(
            /value is not a valid email address:.+/i,
            "El correo electrónico no es válido, revisa que este bien escrito e intentalo nuevamente",
          ),
        )
      : null;

    return {
      error: emailError ?? json.detail ?? "Error en la petición",
      data: null,
    };
  }

  return json;
}
