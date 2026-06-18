import { useCurrentUser } from "../globals/hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ roles }) {
  const { hasRole, loading, error } = useCurrentUser();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#FBF9FC] dark:bg-black">
        <span className="w-8 h-8 rounded-full border-2 border-black border-b-transparent animate-rotation dark:border-white dark:border-b-transparent" />
      </div>
    );
  }

  if (error || !hasRole(roles)) return <Navigate to={"/login"} replace />;

  return <Outlet />;
}
