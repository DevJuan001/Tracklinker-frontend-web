import { apiRoutes } from "../../config/apiRoutes";

export async function updateCurrentUserPasswordService(password_data) {
  const response = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.auth}/update-password`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password_data),
    },
  );

  if (!response.ok) {
    throw new Error("Error al intentar obtener tu información");
  }

  return await response.json();
}
