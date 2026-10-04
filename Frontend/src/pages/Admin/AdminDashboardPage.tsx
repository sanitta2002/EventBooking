import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck2, Grid, Users, DollarSign, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { getServices } from "../../service/servicesService";
import { getAllBookings } from "../../service/bookingService";
import { getAllUsers } from "../../service/userService";
import { FRONT_ROUTES } from "../../constants/frontRoutes";
import type { EventService } from "../../types/service";
import type { Booking } from "../../types/booking";
import type { User } from "../../types/auth";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<EventService[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [svcData, bkgData, usrData] = await Promise.all([
        getServices().catch(() => []),
        getAllBookings().catch(() => []),
        getAllUsers().catch(() => []),
      ]);
      setServices(svcData);
      setBookings(bkgData);
      setUsers(usrData);
    } catch (err) {
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 h-96 w-96 bg-slate-800 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> Platform Overview
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Executive Admin Portal</h1>
          <p className="text-sm text-slate-400 font-medium">
            Manage listings, inspect customer bookings, control user permissions, and monitor activity.
          </p>
        </div>

        <button
          onClick={loadAdminData}
          className="relative z-10 p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shadow-md flex items-center gap-2 text-xs font-semibold"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Overview</span>
        </button>
      </section>

      {/* Stats Overview Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Services</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{loading ? "..." : services.length}</h3>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
            <Grid className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Bookings</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{loading ? "..." : bookings.length}</h3>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
            <CalendarCheck2 className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered Users</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{loading ? "..." : users.length}</h3>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Volume</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">${loading ? "..." : totalRevenue}</h3>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          onClick={() => navigate(FRONT_ROUTES.ADMIN.SERVICES)}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold shadow-md">
              <Grid className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-black">Service Directory</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Create, update, delete, and inspect all event service listings across categories.
            </p>
          </div>
          <div className="mt-8 flex items-center text-xs font-bold text-black gap-2">
            <span>Manage Services</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => navigate(FRONT_ROUTES.ADMIN.BOOKINGS)}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold shadow-md">
              <CalendarCheck2 className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-black">Booking Requests</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Review user booking reservations, change status, and view customer requests.
            </p>
          </div>
          <div className="mt-8 flex items-center text-xs font-bold text-black gap-2">
            <span>Manage Bookings</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => navigate(FRONT_ROUTES.ADMIN.USERS)}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold shadow-md">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-black">User Directory</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Inspect user profiles, manage administrative roles, and maintain user access.
            </p>
          </div>
          <div className="mt-8 flex items-center text-xs font-bold text-black gap-2">
            <span>Manage Users</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* Recent Bookings Section */}
      <section className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Platform Activity</h2>
            <p className="text-xs text-gray-500 font-medium">Latest client booking requests</p>
          </div>
          <button
            onClick={() => navigate(FRONT_ROUTES.ADMIN.BOOKINGS)}
            className="text-xs font-bold text-black hover:underline"
          >
            View All Bookings &rarr;
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
            No recent bookings registered in system.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-700">
                <tr>
                  <th className="px-4 py-3">Booking ID</th>
                  <th className="px-4 py-3">Start Date</th>
                  <th className="px-4 py-3">End Date</th>
                  <th className="px-4 py-3">Days</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id || b._id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{(b.id || b._id || "").substring(0, 8)}...</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{b.startDate ? new Date(b.startDate).toLocaleDateString() : "N/A"}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{b.endDate ? new Date(b.endDate).toLocaleDateString() : "N/A"}</td>
                    <td className="px-4 py-3 text-gray-600">{b.numberOfDays} day(s)</td>
                    <td className="px-4 py-3 font-bold text-gray-900">${b.totalPrice}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-gray-100 border border-gray-200 text-gray-800">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
