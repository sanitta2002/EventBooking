import React from "react";
import { Search, Filter, SlidersHorizontal, Grid, List } from "lucide-react";
import { ServiceCategory } from "../../types/service";
import type { ServiceQueryParams } from "../../types/service";
import { getCategoryLabel } from "./CategoryIcon";

interface ServiceFilterBarProps {
  filters: ServiceQueryParams;
  viewMode?: "grid" | "table";
  onChangeFilters: (filters: ServiceQueryParams) => void;
  onChangeViewMode?: (mode: "grid" | "table") => void;
  showViewToggle?: boolean;
}

export const ServiceFilterBar: React.FC<ServiceFilterBarProps> = ({
  filters,
  viewMode = "grid",
  onChangeFilters,
  onChangeViewMode,
  showViewToggle = true,
}) => {
  const categories = [
    { label: "All Categories", value: "" },
    ...Object.values(ServiceCategory).map((cat) => ({
      label: getCategoryLabel(cat),
      value: cat,
    })),
  ];

  return (
    <div className="space-y-4">
      {/* Top Search & Filter Control Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white rounded-3xl p-4 border border-gray-200 shadow-sm">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by venue name, caterer, DJ, photographer..."
            value={filters.keyword || ""}
            onChange={(e) => onChangeFilters({ ...filters, keyword: e.target.value })}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-2xl text-sm text-black focus:bg-white focus:outline-none focus:border-gray-300 transition-all"
          />
        </div>

        {/* Price Inputs */}
        <div className="flex items-center gap-2 px-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-500 shrink-0" />
          <input
            type="number"
            placeholder="Min $"
            min="0"
            value={filters.minPrice || ""}
            onChange={(e) =>
              onChangeFilters({
                ...filters,
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-24 px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:border-gray-300"
          />
          <span className="text-xs text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max $"
            min="0"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              onChangeFilters({
                ...filters,
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-24 px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs text-black focus:outline-none focus:border-gray-300"
          />
        </div>

        {/* Grid/Table View Toggle */}
        {showViewToggle && onChangeViewMode && (
          <div className="flex items-center bg-gray-100 border border-gray-200 p-1 rounded-xl shrink-0">
            <button
              onClick={() => onChangeViewMode("grid")}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onChangeViewMode("table")}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="h-4 w-4 text-gray-500 shrink-0 ml-1" />
        {categories.map((cat) => {
          const isActive = (filters.category || "") === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => onChangeFilters({ ...filters, category: cat.value as any })}
              className={`px-4 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-black text-white border-gray-300 shadow-md shadow-gray-200"
                  : "bg-white text-black border-gray-200 hover:bg-gray-100 hover:border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
