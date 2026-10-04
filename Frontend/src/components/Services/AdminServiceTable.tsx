import React, { useState } from "react";
import { Edit2, Trash2, Calendar, Phone, Eye, AlertTriangle } from "lucide-react";
import type { EventService } from "../../types/service";
import { CategoryIcon, getCategoryLabel } from "./CategoryIcon";

interface AdminServiceTableProps {
  services: EventService[];
  loading?: boolean;
  onEdit: (service: EventService) => void;
  onDelete: (serviceId: string) => Promise<void>;
  onView: (service: EventService) => void;
}

export const AdminServiceTable: React.FC<AdminServiceTableProps> = ({
  services,
  loading = false,
  onEdit,
  onDelete,
  onView,
}) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await onDelete(deleteId);
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const fallbackImage = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-[11px] font-semibold tracking-wider text-black/70 uppercase">
              <th className="py-4 px-6">Service</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Price / Day</th>
              <th className="py-4 px-6">Availability</th>
              <th className="py-4 px-6">Contact Info</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6b7280]/15 text-sm text-black">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  Loading service records...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  No services found. Click "Add Service" to create your first listing.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-100/60 transition-colors group">
                  {/* Service Banner & Title */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={service.imageUrl || fallbackImage}
                        alt={service.title}
                        className="h-12 w-16 object-cover rounded-xl border border-gray-200 bg-gray-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = fallbackImage;
                        }}
                      />
                      <div>
                        <h4 className="font-medium text-black group-hover:text-gray-500 transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category Pill */}
                  <td className="py-4 px-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-black">
                      <CategoryIcon category={service.category} className="h-3.5 w-3.5 text-gray-500" />
                      <span>{getCategoryLabel(service.category)}</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 font-medium text-black">
                    <span className="text-gray-500 font-semibold">${service.pricePerDay}</span>
                  </td>

                  {/* Availability */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 text-xs text-black">
                      <Calendar className="h-3.5 w-3.5 text-gray-500" />
                      <span>{service.availabilityDates?.length || 0} dates</span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-4 px-6 text-xs text-black/80">
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-gray-500" />
                      <span>{service.contactDetails}</span>
                    </div>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(service)}
                        title="View Details"
                        className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit(service)}
                        title="Edit Service"
                        className="p-2 rounded-xl text-black hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(service.id)}
                        title="Delete Service"
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-gray-200 shadow-2xl">
            <div className="flex items-center gap-3 text-red-500">
              <div className="p-3 rounded-2xl bg-red-50">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-black">Confirm Delete</h3>
                <p className="text-xs text-gray-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-black/80">
              Are you sure you want to delete this event service from the listing catalog?
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-black hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-medium shadow-md transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
