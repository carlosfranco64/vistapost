import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  console.log("Auth Loading:", loading, "Authenticated:", isAuthenticated);

  if (loading) return <h1 className=" z-50 text-center mt-10 text-xl font-bold bg-green-400">Loading...</h1>;

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
