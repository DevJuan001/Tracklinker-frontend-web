import { apiRoutes } from "../config/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export default function ProtectedRoutes({ roles }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["roles-verification", roles],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${apiRoutes.apiUrl}${apiRoutes.auth}/verify-roles`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roles }),
        },
      );

      if (!response.ok) throw new Error("Not authorized");

      const result = await response.json();

      return result.success === true;
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });

  if (isLoading) return null;

  // Si hay error o no está autorizado
  if (isError || data === false) return <Navigate to={"/login"} replace />;

  return <Outlet />;
}
