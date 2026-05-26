import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function editUserService(user_id, user_data) {
  const response = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.users}/update/${user_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_data),
    },
  );

  const json = await response.json();

  const emailError = json.detail.map((err) =>
    err.msg.replace(
      /value is not a valid email address:.+/i,
      "El correo electrónico no es válido, revisa que este bien escrito e intentalo nuevamente",
    ),
  );

  if (!response.ok) {
    return {
      error: emailError || json.detail || "Error en la petición",
      data: null,
    };
  }

  return json;
}
