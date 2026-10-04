import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Calendar, LayoutDashboard, Users, Bookmark, Settings, ExternalLink } from "lucide-react";
import { logout } from "../../store/authSlice";
import { FRONT_ROUTES } from "../../constants/frontRoutes";
import type { RootState } from "../../store/store";
import { cn } from "../../lib/utils";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate(FRONT_ROUTES.AUTH.LOGIN);
  };

  const navItems = [
    { name: "Dashboard", path: FRONT_ROUTES.ADMIN.DASHBOARD, icon: LayoutDashboard },
    { name: "Services", path: FRONT_ROUTES.ADMIN.SERVICES, icon: Calendar },
    { name: "Users", path: FRONT_ROUTES.ADMIN.USERS, icon: Users },
    { name: "Bookings", path: FRONT_ROUTES.ADMIN.BOOKINGS, icon: Bookmark },
  ];

  const getPageTitle = () => {
    if (location.pathname.includes('/services')) return 'Service Management';
    if (location.pathname.includes('/users')) return 'User Management';
    if (location.pathname.includes('/bookings')) return 'Booking Management';
    return 'Admin Dashboard';
  };

  return (
    <div className="flex h-screen bg-neutral-100 font-sans text-neutral-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col transition-all duration-300 shadow-xl shrink-0">
        <div className="p-6 flex items-center space-x-3 bg-slate-950 border-b border-slate-800">
          <div className="bg-white/10 p-2 rounded-xl text-white">
            <Settings size={22} />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight block leading-none">EventLuxe</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Admin Control</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-4 mb-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Management
            </p>
          </div>
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
                    isActive
                      ? "bg-white text-slate-900 shadow-md font-bold"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon size={18} className={cn(isActive ? "text-slate-900" : "text-slate-400")} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Storefront Link & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to={FRONT_ROUTES.DASHBOARD}
            className="w-full flex items-center justify-between text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-800 p-2.5 rounded-xl transition-colors border border-slate-700/50"
          >
            <span>User View</span>
            <ExternalLink size={14} />
          </Link>

          <div className="flex items-center space-x-3 px-2 pt-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8 shadow-sm shrink-0">
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
            {getPageTitle()}
          </h1>

          <div className="flex items-center space-x-4">
            <span className="text-xs font-semibold px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-full text-neutral-600">
              Role: Administrator
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-neutral-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
