import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getAllBookings, updateBookingStatus } from "../../service/bookingService";
import type { Booking } from "../../types/booking";
import { toast } from "sonner";
import { Calendar, User as UserIcon, Building2, Layers } from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      toast.success(`Booking status updated to ${newStatus}`);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update booking status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  const formatDateStr = (d: string) => {
    try {
      return format(new Date(d), "PPP");
    } catch {
      return d || "N/A";
    }
  };

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(b => b.status?.toLowerCase() === filter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-gray-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Client Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and update service reservation status</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none text-sm bg-white font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white p-6 rounded-3xl border border-gray-200 h-32"></div>
            ))}
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-gray-200">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No bookings found</h3>
            <p className="mt-2 text-sm text-gray-500">There are no bookings matching the current filter.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => {
            const bookingId = booking.id || booking._id || "";
            return (
              <div key={bookingId} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between lg:justify-start lg:gap-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {booking.service?.title || `Service ID: ${booking.serviceId}`}
                    </h3>
                    <span className={`px-3 py-1 rounded-full border text-xs font-bold capitalize lg:hidden ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">
                        {booking.user ? `${booking.user.name} (${booking.user.email})` : `User ID: ${booking.userId}`}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {formatDateStr(booking.startDate)} &rarr; {formatDateStr(booking.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-gray-400" />
                      <span>{booking.numberOfDays} day(s) (${booking.pricePerDay}/day)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span>Total Price: <strong className="text-gray-900">${booking.totalPrice}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:flex-col lg:items-end gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 lg:pl-6 lg:border-l border-gray-100">
                  <span className={`hidden lg:inline-flex px-3 py-1 rounded-full border text-xs font-bold capitalize ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>

                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    <select
                      value={booking.status}
                      disabled={booking.status === "cancelled"}
                      onChange={(e) => handleStatusChange(bookingId, e.target.value)}
                      className={`flex-1 lg:w-40 px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-black outline-none font-semibold transition-colors ${
                        booking.status === "cancelled"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-50 hover:bg-white text-gray-800"
                      }`}
                    >
                      <option value="pending">Set Pending</option>
                      <option value="confirmed">Confirm Booking</option>
                      <option value="completed">Mark Completed</option>
                      <option value="cancelled">Cancelled (Locked)</option>
                    </select>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
