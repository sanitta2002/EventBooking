import React from "react";
import { Calendar, Phone, Edit2, Trash2, Eye,} from "lucide-react";
import type { EventService } from "../../types/service";
import { CategoryIcon, getCategoryLabel } from "./CategoryIcon";

interface ServiceCardProps {
  service: EventService;
  isAdmin?: boolean;
  onViewDetails?: (service: EventService) => void;
  onEdit?: (service: EventService) => void;
  onDelete?: (service: EventService) => void;
  onBook?: (service: EventService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isAdmin = false,
  onViewDetails,
  onEdit,
  onDelete,
  onBook,
}) => {
  const fallbackImage = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Card Image Container */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <img
            src={service.imageUrl || fallbackImage}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-black shadow-md border border-gray-200">
            <CategoryIcon category={service.category} className="h-3.5 w-3.5 text-gray-500" />
            <span className="capitalize">{getCategoryLabel(service.category)}</span>
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl text-sm font-bold border border-white/20">
            <span className="font-semibold text-gray-500">${service.pricePerDay}</span>
            <span className="text-xs text-gray-300"> / day</span>
          </div>

          {/* Quick Admin Actions Overlay */}
          {isAdmin && (
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(service);
                }}
                title="Edit Service"
                className="p-2 rounded-xl bg-white/90 text-black hover:bg-black hover:text-white transition-colors shadow-md border border-gray-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(service);
                }}
                title="Delete Service"
                className="p-2 rounded-xl bg-white/90 text-red-600 hover:bg-red-500 hover:text-white transition-colors shadow-md border border-red-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-medium text-black line-clamp-1 group-hover:text-gray-500 transition-colors">
            {service.title}
          </h3>

          <p className="text-sm text-black/70 line-clamp-2 font-bold leading-relaxed">
            {service.description}
          </p>

          <div className="pt-2 flex flex-col gap-2 border-t border-gray-200 text-xs text-black/80">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span className="font-medium text-black">
                {service.availabilityDates?.length || 0} dates available
              </span>
            </div>

            <div className="flex items-center gap-2 text-black/60">
              <Phone className="h-3.5 w-3.5 shrink-0 text-gray-500" />
              <span className="truncate">{service.contactDetails}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0 flex items-center gap-3">
        <button
          onClick={() => onViewDetails?.(service)}
          className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-100 text-black text-xs font-medium transition-all flex items-center justify-center gap-1.5"
        >
          <Eye className="h-3.5 w-3.5 text-gray-500" />
          View Details
        </button>

        <button
          onClick={() => onBook?.(service)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-medium transition-all shadow-md shadow-gray-200 flex items-center justify-center gap-1.5"
        >
        
          Reserve
        </button>
      </div>
    </div>
  );
};
