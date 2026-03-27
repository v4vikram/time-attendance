import { useAuth } from "@/modules/auth/hooks/useAuth";
import Loader from "@/shared/components/Loader";
import { Navigate, Outlet } from "react-router-dom";


type Props = {
  allowedRoles?: string[];
};

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user, isLoading } = useAuth();


  if (isLoading && !user) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};