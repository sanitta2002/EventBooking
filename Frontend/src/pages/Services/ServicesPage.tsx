import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { EventService, ServiceQueryParams } from "../../types/service";
import type { CreateBookingInput } from "../../types/booking";
import { getServices } from "../../service/servicesService";
import { createBooking } from "../../service/bookingService";
import { ServiceCard } from "../../components/Services/ServiceCard";
import { ServiceDetailModal } from "../../components/Services/ServiceDetailModal";
import { ServiceFilterBar } from "../../components/Services/ServiceFilterBar";
import { FRONT_ROUTES } from "../../constants/frontRoutes";
import type { RootState } from "../../store/store";
import { toast } from "sonner";

export default function ServicesPage() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [services, setServices] = useState<EventService[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<ServiceQueryParams>({});
  const [selectedService, setSelectedService] = useState<EventService | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchServicesData = async (queryFilters?: ServiceQueryParams) => {
    setLoading(true);
    try {
      const data = await getServices(queryFilters);
      setServices(data);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesData(filters);
  }, [filters]);

  const handleBook = async (bookingInput: CreateBookingInput) => {
    try {
      await createBooking(bookingInput);
      toast.success("Booking successful!");
      navigate(FRONT_ROUTES.MY_BOOKINGS);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to book service");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans text-gray-900">
     
    

      {/* Filter Bar */}
      <ServiceFilterBar
        filters={filters}
        onChangeFilters={(newFilters) => setFilters(newFilters)}
        showViewToggle={false}
      />

      {/* Service Cards Grid */}
      <section>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 rounded-3xl bg-white border border-gray-200 animate-pulse p-6 flex flex-col justify-between"
              >
                <div className="h-44 w-full bg-gray-100 rounded-2xl" />
                <div className="space-y-2 pt-4">
                  <div className="h-4 w-3/4 bg-gray-100 rounded" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="h-14 w-14 rounded-2xl bg-gray-100 text-gray-500 border border-gray-200 mx-auto flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-black">No Services Available</h3>
            <p className="text-xs text-gray-500">
              No event listings match your search criteria. Try adjusting your category or keyword filter.
            </p>
            <button
              onClick={() => setFilters({})}
              className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-all shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id || service._id}
                service={service}
                isAdmin={isAdmin}
                onViewDetails={(s) => {
                  setSelectedService(s);
                  setIsDetailOpen(true);
                }}
                onBook={(s) => {
                  setSelectedService(s);
                  setIsDetailOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedService(null);
        }}
        onBook={handleBook}
      />
    </div>
  );
}
