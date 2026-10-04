import React, { useState } from "react";
import { X, Calendar, Phone, CheckCircle2, ChevronLeft, DollarSign } from "lucide-react";
import type { EventService } from "../../types/service";
import type { CreateBookingInput } from "../../types/booking";
import { CategoryIcon, getCategoryLabel } from "./CategoryIcon";

interface ServiceDetailModalProps {
  service: EventService | null;
  isOpen: boolean;
  onClose: () => void;
  onBook?: (data: CreateBookingInput) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onBook,
}) => {
  const [isBooking, setIsBooking] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!isOpen || !service) return null;

  const fallbackImage = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800";

  const handleClose = () => {
    setIsBooking(false);
    setStartDate("");
    setEndDate("");
    onClose();
  };

  // Calculate days & total price
  const calculateBookingDetails = () => {
    if (!startDate || !endDate) return { days: 0, total: 0 };
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) return { days: 0, total: 0 };

    const diffTime = end.getTime() - start.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const total = days * service.pricePerDay;
    return { days, total };
  };

  const { days, total } = calculateBookingDetails();

  const handleConfirmBooking = () => {
    if (!startDate || !endDate) {
      alert("Please select both start date and end date.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }
    const serviceId = service.id || (service as any)._id;
    if (onBook && serviceId) {
      onBook({
        serviceId,
        startDate,
        endDate,
      });
    }
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 font-sans text-gray-900">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative flex flex-col">
        {/* Modal Banner Image */}
        <div className="relative h-64 w-full bg-gray-100 shrink-0">
          <img
            src={service.imageUrl || fallbackImage}
            alt={service.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-black hover:bg-white transition-colors shadow-md"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-black">
                <CategoryIcon category={service.category} className="h-3.5 w-3.5 text-gray-700" />
                <span>{getCategoryLabel(service.category)}</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide">{service.title}</h2>
            </div>

            <div className="bg-black text-white px-4 py-2 rounded-2xl text-right shadow-lg">
              <span className="text-xs text-white/80 block uppercase tracking-wider font-semibold">Per Day</span>
              <span className="text-xl font-bold">${service.pricePerDay}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6 flex-1">
          {!isBooking ? (
            <>
              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500">About Service</h3>
                <p className="text-sm text-gray-800 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500">Location</h3>
                <p className="text-sm font-semibold text-black">{service.location}</p>
              </div>

              {/* Availability Dates */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm font-bold text-black">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Available Dates</span>
                </div>

                {service.availabilityDates && service.availabilityDates.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {service.availabilityDates.map((dateStr, idx) => {
                      const dateObj = new Date(dateStr);
                      const formatted = isNaN(dateObj.getTime())
                        ? dateStr
                        : dateObj.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      return (
                        <div
                          key={idx}
                          className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-xl text-xs text-black flex items-center gap-1.5 font-medium"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-gray-700" />
                          <span>{formatted}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">Dates are available on request.</p>
                )}
              </div>

              {/* Contact Details Card */}
              <div className="p-4 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block font-semibold">Contact Provider</span>
                    <span className="text-sm font-bold text-black">{service.contactDetails}</span>
                  </div>
                </div>


              </div>
            </>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setIsBooking(false)} className="text-gray-500 hover:text-black p-1">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-bold text-black">Select Reservation Dates</h3>
              </div>

              <div className="space-y-4">
                {(!service.availabilityDates || service.availabilityDates.length === 0) && (
                  <p className="text-xs text-amber-600 font-semibold bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    No available dates have been set by the admin for this service yet.
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Start Date *</label>
                    <select
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setEndDate("");
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none text-sm bg-white"
                      required
                    >
                      <option value="">-- Select Start Date --</option>
                      {(service.availabilityDates || []).map((dateStr, idx) => {
                        const dateObj = new Date(dateStr);
                        const value = dateObj.toISOString().split("T")[0];
                        const label = isNaN(dateObj.getTime())
                          ? dateStr
                          : dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
                        return (
                          <option key={idx} value={value}>{label}</option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">End Date *</label>
                    <select
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none text-sm bg-white"
                      required
                      disabled={!startDate}
                    >
                      <option value="">-- Select End Date --</option>
                      {(service.availabilityDates || [])
                        .filter((dateStr) => {
                          const dateObj = new Date(dateStr);
                          const value = dateObj.toISOString().split("T")[0];
                          return value >= startDate;
                        })
                        .map((dateStr, idx) => {
                          const dateObj = new Date(dateStr);
                          const value = dateObj.toISOString().split("T")[0];
                          const label = isNaN(dateObj.getTime())
                            ? dateStr
                            : dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
                          return (
                            <option key={idx} value={value}>{label}</option>
                          );
                        })}
                    </select>
                  </div>
                </div>

                {/* Price Calculation Box */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-gray-600">
                    <span>Daily Rate:</span>
                    <span>${service.pricePerDay} / day</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-gray-600">
                    <span>Duration:</span>
                    <span>{days} day(s)</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm font-bold text-black">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" /> Total Price:
                    </span>
                    <span className="text-lg text-black">${total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between rounded-b-3xl shrink-0">
          <div className="text-xs text-gray-500 max-w-[60%] font-medium">
            Instant booking reservation & vendor notification.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-black hover:bg-white transition-colors"
            >
              Cancel
            </button>
            {!isBooking ? (
              <button
                onClick={() => setIsBooking(true)}
                className="px-6 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >

                Book This Service
              </button>
            ) : (
              <button
                onClick={handleConfirmBooking}
                className="px-6 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirm (${total})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
