import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { FRONT_ROUTES } from "../../constants/frontRoutes";

export default function PublicRoute() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // If the user is already logged in, redirect them away from login/register pages
  if (accessToken) {
    return <Navigate to={FRONT_ROUTES.DASHBOARD} replace />;
  }

  // Otherwise, render the public component (like Login or Register)
  return <Outlet />;
}
