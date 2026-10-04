import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getMyBookings, cancelUserBooking } from "../../service/bookingService";
import type { Booking } from "../../types/booking";
import { toast } from "sonner";
import { Calendar, CheckCircle, XCircle, Clock4, DollarSign, Layers } from "lucide-react";

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (error) {
      toast.error("Failed to fetch your bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelUserBooking(bookingId);
        toast.success("Booking cancelled successfully");
        fetchBookings();
      } catch (error) {
        toast.error("Failed to cancel booking");
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock4 className="h-4 w-4 text-amber-600" />;
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Reservations</h1>
          <p className="text-sm text-gray-500 mt-1">Review your scheduled event service bookings</p>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-3xl border border-gray-200 h-44"></div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-200 shadow-sm">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-bold text-gray-900">No bookings found</h3>
          <p className="mt-2 text-sm text-gray-500">You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bookings.map((booking) => {
            const bookingId = booking.id || booking._id || "";
            return (
              <div
                key={bookingId}
                className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {booking.service?.title || `Service #${booking.serviceId.substring(0, 8)}`}
                      </h3>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className={`px-3 py-1 rounded-full border text-xs font-bold capitalize flex items-center gap-1.5 ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-gray-900">${booking.totalPrice}</div>
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Total Price</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {formatDateStr(booking.startDate)} &rarr; {formatDateStr(booking.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                      <Layers className="h-4 w-4 text-gray-500" />
                      <span>{booking.numberOfDays} day(s) (${booking.pricePerDay}/day)</span>
                    </div>

                    {booking.service?.contactDetails && (
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span>Contact: {booking.service.contactDetails}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-gray-400">Ref: {bookingId}</span>
                  {booking.status !== "cancelled" && booking.status !== "completed" && (
                    <button
                      onClick={() => handleCancelBooking(bookingId)}
                      className="px-3 py-1 rounded-xl font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
