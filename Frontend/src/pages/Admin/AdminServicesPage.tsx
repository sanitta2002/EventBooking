import { useEffect, useState } from "react";
import { Plus, RefreshCw, Layers, DollarSign, Tag,} from "lucide-react";
import type { EventService, ServiceQueryParams, CreateServiceInput, UpdateServiceInput } from "../../types/service";
import { getServices, createService, updateService, deleteService } from "../../service/servicesService";
import { AdminServiceTable } from "../../components/Services/AdminServiceTable";
import { ServiceCard } from "../../components/Services/ServiceCard";
import { ServiceFormModal } from "../../components/Services/ServiceFormModal";
import { ServiceDetailModal } from "../../components/Services/ServiceDetailModal";
import { ServiceFilterBar } from "../../components/Services/ServiceFilterBar";
import { toast } from "sonner";

export default function AdminServicesPage() {
  const [services, setServices] = useState<EventService[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ServiceQueryParams>({});
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<EventService | null>(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<EventService | null>(null);

  const fetchAdminServices = async (queryFilters?: ServiceQueryParams) => {
    setLoading(true);
    try {
      const data = await getServices(queryFilters);
      setServices(data);
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminServices(filters);
  }, [filters]);

  // Form Submission Handler (Create or Edit)
  const handleFormSubmit = async (
    data: CreateServiceInput | UpdateServiceInput,
    imageFile?: File
  ) => {
    if (editingService) {
      const updated = await updateService(editingService.id || (editingService as any)._id, data, imageFile);
      toast.success(`Service "${updated.title}" updated successfully!`);
    } else {
      const created = await createService(data as CreateServiceInput, imageFile);
      toast.success(`Service "${created.title}" published successfully!`);
    }
    fetchAdminServices(filters);
  };

  // Delete Handler
  const handleDeleteService = async (id: string) => {
    try {
      await deleteService(id);
      toast.success("Service deleted successfully");
      setServices((prev) => prev.filter((s) => s.id !== id && (s as any)._id !== id));
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete service");
      throw err;
    }
  };

  // Metrics Calculations
  const totalServices = services.length;
  const avgPrice =
    totalServices > 0
      ? Math.round(services.reduce((acc, s) => acc + (s.pricePerDay || 0), 0) / totalServices)
      : 0;
  const uniqueCategories = new Set(services.map((s) => s.category)).size;

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans text-gray-900">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 h-96 w-96 bg-gray-100 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-600 font-semibold">
           Service Inventory Control
          </div>
          <h2 className="text-3xl font-bold text-black tracking-tight">
            Service <span className="font-medium text-gray-500">Asset Management</span>
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Add, update, filter, and monitor all event service listings across your platform.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => fetchAdminServices(filters)}
            className="p-3 rounded-2xl bg-gray-100 border border-gray-200 text-gray-600 hover:text-black hover:bg-white transition-all shadow-sm"
            title="Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={() => {
              setEditingService(null);
              setIsFormOpen(true);
            }}
            className="px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-2xl text-xs font-semibold transition-all shadow-lg flex items-center gap-2"
          >
            <Plus className="h-4 w-4 text-white" />
            Create Service Listing
          </button>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gray-100 border border-gray-200 text-gray-700 flex items-center justify-center font-bold">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-black">{totalServices}</span>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Active Listings</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gray-100 border border-gray-200 text-gray-700 flex items-center justify-center font-bold">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-black">${avgPrice}</span>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Avg. Price / Day</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gray-100 border border-gray-200 text-gray-700 flex items-center justify-center font-bold">
            <Tag className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-black">{uniqueCategories}</span>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Categories</p>
          </div>
        </div>
      </section>

      {/* Filter Controls & View Switcher */}
      <ServiceFilterBar
        filters={filters}
        viewMode={viewMode}
        onChangeFilters={(newFilters) => setFilters(newFilters)}
        onChangeViewMode={(mode) => setViewMode(mode)}
        showViewToggle={true}
      />

      {/* Services Render Section (Table vs Grid) */}
      <section>
        {viewMode === "table" ? (
          <AdminServiceTable
            services={services}
            loading={loading}
            onEdit={(service) => {
              setEditingService(service);
              setIsFormOpen(true);
            }}
            onDelete={handleDeleteService}
            onView={(service) => {
              setSelectedService(service);
              setIsDetailOpen(true);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id || (service as any)._id}
                service={service}
                isAdmin={true}
                onViewDetails={(s) => {
                  setSelectedService(s);
                  setIsDetailOpen(true);
                }}
                onEdit={(s) => {
                  setEditingService(s);
                  setIsFormOpen(true);
                }}
                onDelete={(s) => handleDeleteService(s.id || (s as any)._id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Create / Edit Form Modal */}
      <ServiceFormModal
        isOpen={isFormOpen}
        service={editingService}
        onClose={() => {
          setIsFormOpen(false);
          setEditingService(null);
        }}
        onSubmit={handleFormSubmit}
      />

      {/* Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedService(null);
        }}
      />
    </div>
  );
}
