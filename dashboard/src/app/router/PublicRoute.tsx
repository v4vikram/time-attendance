import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
//   const { user } = useAuth();
const user = true

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};