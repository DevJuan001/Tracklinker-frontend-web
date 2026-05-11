import { apiRoutes } from "../config/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export default function ProtectedRoutes({ roles }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["roles-verification", roles],
    queryFn: async () => {
      const res = await fetchWithAuth(
        `${apiRoutes.apiUrl}${apiRoutes.auth}/verify-roles`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roles }),
        },
      );

      if (!res.ok) throw new Error("Not authorized");
      const result = await res.json();
      return result.success === true;
    },
    // Cacheamos la verificación por 30 minutos para evitar peticiones en cada clic
    staleTime: 1000 * 60 * 30,
    gcTime: 0,
    retry: false,
  });

  if (isLoading) return null;

  // Si hay error o no está autorizado
  if (isError || data === false) return <Navigate to={"/login"} replace />;

  return <Outlet />;
}
