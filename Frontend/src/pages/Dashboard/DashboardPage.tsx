import { LogOut, Calendar, Plus, Users, Search, Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { FRONT_ROUTES } from "../../constants/frontRoutes";
import type { RootState } from "../../store/store";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate(FRONT_ROUTES.AUTH.LOGIN);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F5] font-sans text-[#2A2A2A] flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#ABA79F]/20 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-light tracking-wide text-[#2A2A2A]">Event<span className="font-semibold text-[#ABA79F]">Luxe</span></h1>
          
          <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#ABA79F] group-focus-within:text-[#2A2A2A] transition-colors" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="pl-10 pr-4 py-2 bg-[#F8F7F5] border border-transparent rounded-full text-sm focus:bg-white focus:border-[#ABA79F]/40 focus:outline-none focus:ring-2 focus:ring-[#ABA79F]/20 transition-all w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-[#ABA79F] hover:text-[#2A2A2A] transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-400 border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-6 border-l border-[#ABA79F]/20">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">{user?.name || "Guest"}</span>
              <span className="text-xs text-[#ABA79F]">{user?.role || "Member"}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-[#ABA79F]/20 border border-[#ABA79F]/40 flex items-center justify-center text-[#ABA79F] font-medium">
              {user?.name?.charAt(0).toUpperCase() || "G"}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 flex flex-col gap-8">
        
        {/* Welcome Section */}
        <section className="flex items-end justify-between bg-white rounded-3xl p-8 border border-[#ABA79F]/20 shadow-xl shadow-[#ABA79F]/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-[#ABA79F]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="relative z-10 space-y-2">
            <h2 className="text-4xl font-light text-[#2A2A2A]">Welcome back, <span className="font-medium text-[#ABA79F]">{user?.name?.split(' ')[0] || "Guest"}</span></h2>
            <p className="text-[#ABA79F]">You have 3 upcoming events this week. Let's make them memorable.</p>
          </div>
          
          <div className="relative z-10 flex gap-4">
            <button className="px-6 py-3 bg-white border border-[#ABA79F]/30 text-[#2A2A2A] hover:bg-[#F8F7F5] rounded-xl text-sm font-medium transition-all shadow-sm flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#ABA79F]" />
              Calendar
            </button>
            <button className="px-6 py-3 bg-[#ABA79F] text-white hover:bg-[#96928a] hover:shadow-lg shadow-[#ABA79F]/20 rounded-xl text-sm font-medium transition-all flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Event
            </button>
          </div>
        </section>

        {/* Dashboard Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Upcoming Events Card */}
          <div className="md:col-span-2 bg-white border border-[#ABA79F]/20 rounded-3xl p-8 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-medium text-[#2A2A2A]">Upcoming Events</h3>
              <button className="text-sm text-[#ABA79F] hover:text-[#2A2A2A] transition-colors">View All</button>
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-[#F8F7F5] border border-transparent hover:border-[#ABA79F]/20 transition-all cursor-pointer">
                  <div className="h-14 w-14 rounded-2xl bg-[#ABA79F]/10 text-[#ABA79F] flex flex-col items-center justify-center font-medium border border-[#ABA79F]/20">
                    <span className="text-xs uppercase">Oct</span>
                    <span className="text-lg leading-tight">{10 + i}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-[#2A2A2A] group-hover:text-[#ABA79F] transition-colors">Gala Dinner 2026</h4>
                    <p className="text-sm text-[#ABA79F] flex items-center gap-2 mt-1">
                      <span>Grand Royal Hotel</span> • <span>19:00 PM</span>
                    </p>
                  </div>
                  <div className="flex -space-x-3">
                    {[1,2,3].map((j) => (
                      <div key={j} className="h-8 w-8 rounded-full bg-white border-2 border-[#F8F7F5] shadow-sm flex items-center justify-center text-[10px] text-[#ABA79F] bg-gray-50">
                        P{j}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col gap-8">
            <div className="bg-white border border-[#ABA79F]/20 rounded-3xl p-8 shadow-sm flex-1 relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 h-32 w-32 bg-[#ABA79F]/5 rounded-tl-full -z-0 group-hover:bg-[#ABA79F]/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-[#ABA79F]/10 text-[#ABA79F] flex items-center justify-center mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-4xl font-light text-[#2A2A2A] mb-2">1,248</h3>
                <p className="text-sm text-[#ABA79F]">Total attendees registered this month.</p>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full bg-white border border-red-100 hover:bg-red-50 hover:border-red-200 text-red-500 rounded-2xl p-4 flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-sm"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
