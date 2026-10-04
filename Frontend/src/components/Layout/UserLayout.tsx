import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Calendar, Home, Bookmark, ShieldCheck,  } from "lucide-react";
import { logout } from "../../store/authSlice";
import { FRONT_ROUTES } from "../../constants/frontRoutes";
import type { RootState } from "../../store/store";
import { cn } from "../../lib/utils";

export default function UserLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const handleLogout = () => {
    dispatch(logout());
    navigate(FRONT_ROUTES.AUTH.LOGIN);
  };

  const navItems = [
    { name: "Dashboard", path: FRONT_ROUTES.DASHBOARD, icon: Home },
    { name: "Services", path: FRONT_ROUTES.SERVICES, icon: Calendar },
    { name: "My Bookings", path: FRONT_ROUTES.MY_BOOKINGS, icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Top Header Navigation */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to={FRONT_ROUTES.DASHBOARD} className="flex items-center space-x-2.5">
                <div className="bg-black text-white p-2 rounded-xl shadow-sm">
                 
                </div>
                <span className="text-xl font-bold tracking-tight text-black">
                  Event<span className="text-gray-500">Luxe</span>
                </span>
              </Link>
              
              <nav className="hidden md:flex space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all",
                      location.pathname === item.path
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-600 hover:text-black hover:bg-gray-100"
                    )}
                  >
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {isAdmin && (
                <button
                  onClick={() => navigate(FRONT_ROUTES.ADMIN.DASHBOARD)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-gray-300 text-gray-800 hover:bg-black hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <ShieldCheck size={16} className="text-gray-600 group-hover:text-white" />
                  <span>Admin Portal</span>
                </button>
              )}

              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                <div className="hidden sm:flex flex-col items-end text-xs">
                  <span className="font-semibold text-gray-900">{user?.name || "Guest"}</span>
                  <span className="text-gray-500 capitalize">{user?.role || "Member"}</span>
                </div>
                <div className="h-9 w-9 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shadow-sm">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
