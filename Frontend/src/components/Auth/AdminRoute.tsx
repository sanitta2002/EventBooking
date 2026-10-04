import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { FRONT_ROUTES } from "../../constants/frontRoutes";

export default function AdminRoute() {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (!accessToken) {
    return <Navigate to={FRONT_ROUTES.AUTH.LOGIN} replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to={FRONT_ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
