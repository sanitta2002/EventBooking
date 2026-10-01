import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { FRONT_ROUTES } from "../../constants/frontRoutes";

export default function ProtectedRoute() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // If there's no access token, redirect to login page
  if (!accessToken) {
    return <Navigate to={FRONT_ROUTES.AUTH.LOGIN} replace />;
  }

  // Otherwise, render the protected component
  return <Outlet />;
}
