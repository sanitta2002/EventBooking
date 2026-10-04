import {  CalendarDays, Grid, Bookmark, ArrowRight, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { FRONT_ROUTES } from "../../constants/frontRoutes";
import type { RootState } from "../../store/store";

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  if (isAdmin) {
    return <Navigate to={FRONT_ROUTES.ADMIN.DASHBOARD} replace />;
  }

  return (
    <div className="space-y-8 font-sans text-gray-900">
      {/* Welcome Banner */}
      <section className="flex flex-col md:flex-row md:items-center justify-between bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden gap-6">
        <div className="absolute top-0 right-0 h-96 w-96 bg-gray-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700">
            
            <span>Luxury Event Experience</span>
          </div>
          <h1 className="text-4xl font-extrabold text-black tracking-tight">
            Welcome back, <span className="text-gray-500">{user?.name?.split(" ")[0] || "Guest"}</span>
          </h1>
          <p className="text-gray-600 text-sm font-medium leading-relaxed">
            {isAdmin
              ? "Access platform administration, manage bookings, review service catalog, and monitor active users."
              : "Discover premier luxury venues, high-end caterers, lighting artists, and event professionals for your upcoming occasion."}
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => navigate(FRONT_ROUTES.SERVICES)}
            className="px-6 py-3 bg-black text-white hover:bg-gray-800 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Grid className="h-4 w-4" />
            Browse Services
          </button>
          {isAdmin && (
            <button
              onClick={() => navigate(FRONT_ROUTES.ADMIN.DASHBOARD)}
              className="px-6 py-3 bg-white border border-gray-300 text-black hover:bg-gray-50 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <ShieldCheck className="h-4 w-4 text-gray-700" />
              Admin Portal
            </button>
          )}
        </div>
      </section>

      {/* User Dashboard Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Explore Services Card */}
        <div
          onClick={() => navigate(FRONT_ROUTES.SERVICES)}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold shadow-md">
              <CalendarDays className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-black tracking-tight group-hover:text-gray-700 transition-colors">
              Explore Services
            </h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Find venues, catering, decorators, sound systems, photographers, and event planners.
            </p>
          </div>
          <div className="mt-8 flex items-center text-xs font-bold text-black gap-2">
            <span>View Directory</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* My Bookings Card */}
        <div
          onClick={() => navigate(FRONT_ROUTES.MY_BOOKINGS)}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold shadow-md">
              <Bookmark className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-black tracking-tight group-hover:text-gray-700 transition-colors">
              My Reservations
            </h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Track your scheduled event bookings, status updates, dates, and total prices.
            </p>
          </div>
          <div className="mt-8 flex items-center text-xs font-bold text-black gap-2">
            <span>View My Bookings</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Quick Help / Support Card */}
        <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-40 w-40 bg-slate-800 rounded-full blur-2xl opacity-50" />
          <div className="relative z-10 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold">
              <CalendarDays className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Seamless Booking</h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Book luxury venues and vendors with transparent daily pricing and verified availability dates.
            </p>
          </div>
          <button
            onClick={() => navigate(FRONT_ROUTES.SERVICES)}
            className="relative z-10 mt-8 py-3 px-6 rounded-2xl bg-white text-black text-xs font-bold hover:bg-slate-100 transition-colors shadow-md text-center"
          >
            Start Booking Now
          </button>
        </div>
      </section>
    </div>
  );
}
