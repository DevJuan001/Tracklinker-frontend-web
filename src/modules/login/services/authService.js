import { apiRoutes } from "../../../config/apiRoutes";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

// Función para loguearse
export async function login(form) {
  const res = await fetch(`${apiRoutes.apiUrl}${apiRoutes.auth}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    throw new Error("Credenciales Invalidas");
  }

  return await res.json();
}

// Función para cerrar sesión
export async function logout(navigate) {
  const res = await fetchWithAuth(
    `${apiRoutes.apiUrl}${apiRoutes.auth}/logout`,
    {
      method: "POST",
    },
  );

  if (!res.ok) {
    throw new Error("No se pudo eliminar la cookie");
  }

  navigate("/login");

  return await res.json();
}
