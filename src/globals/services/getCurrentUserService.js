import { apiRoutes } from "../../config/apiRoutes";

export async function getCurrentUserService() {
  const response = await fetch(`${apiRoutes.apiUrl}${apiRoutes.auth}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error al intentar obtener tu información");
  }

  const data = await response.json();

  return data.user;
}
