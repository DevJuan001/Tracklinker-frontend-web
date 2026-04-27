import { apiRoutes } from "../../config/apiRoutes";

export async function updateCurrentUserInfoService(user_data) {
  const response = await fetch(
    `${apiRoutes.apiUrl}${apiRoutes.auth}/update/me`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_data),
    },
  );

  if (!response.ok) {
    throw new Error("Error al intentar obtener tu información");
  }

  return await response.json();
}
