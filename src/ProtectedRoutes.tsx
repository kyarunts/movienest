import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useService } from "./shared/hooks/useService";
import { AuthService } from "./shared/services/auth.servic";

type ProtectedRoutesProps = {
  authRequired: boolean;
};
export const ProtectedRoutes: FC<ProtectedRoutesProps> = ({
  authRequired
}) => {
  const { isAuthenticated } = useService(AuthService);
  
  if (authRequired && !isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  } else if (!authRequired && isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
