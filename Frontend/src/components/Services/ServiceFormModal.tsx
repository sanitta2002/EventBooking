import React, { useEffect, useState } from "react";
import { X, Upload, Plus, Calendar, Loader2, MapPin } from "lucide-react";
import { ServiceCategory } from "../../types/service";
import type { EventService, CreateServiceInput, UpdateServiceInput } from "../../types/service";
import { getCategoryLabel } from "./CategoryIcon";

interface ServiceFormModalProps {
  isOpen: boolean;
  service?: EventService | null;
  onClose: () => void;
  onSubmit: (data: CreateServiceInput | UpdateServiceInput, imageFile?: File) => Promise<void>;
}

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  isOpen,
  service,
  onClose,
  onSubmit,
}) => {
  const isEditing = Boolean(service);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ServiceCategory>(ServiceCategory.VENUE);
  const [pricePerDay, setPricePerDay] = useState<number | "">(100);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  const [dates, setDates] = useState<string[]>([]);
  const [newDateInput, setNewDateInput] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setCategory(service.category);
      setPricePerDay(service.pricePerDay);
      setLocation(service.location || "");
      setDescription(service.description);
      setContactDetails(service.contactDetails);
      setImageUrl(service.imageUrl || "");
      setPreviewUrl(service.imageUrl || "");
      setDates(service.availabilityDates ? service.availabilityDates.map(d => d.split("T")[0]) : []);
    } else {
      setTitle("");
      setCategory(ServiceCategory.VENUE);
      setPricePerDay(250);
      setLocation("");
      setDescription("");
      setContactDetails("");
      setImageUrl("");
      setImageFile(undefined);
      setPreviewUrl("");
      // Default to next 3 days
      const today = new Date();
      const defaultDates = [0, 1, 2].map((i) => {
        const d = new Date();
        d.setDate(today.getDate() + i + 1);
        return d.toISOString().split("T")[0];
      });
      setDates(defaultDates);
    }
    setError(null);
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddDate = () => {
    if (newDateInput && !dates.includes(newDateInput)) {
      setDates([...dates, newDateInput]);
      setNewDateInput("");
    }
  };

  const handleRemoveDate = (index: number) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) return setError("Title is required");
    if (!location.trim()) return setError("Location is required");
    if (!description.trim()) return setError("Description is required");
    if (!contactDetails.trim()) return setError("Contact details are required");

    if (typeof pricePerDay !== "number" || pricePerDay < 0) return setError("Valid price per day is required");
    if (dates.length === 0) return setError("At least one availability date is required");

    setLoading(true);
    try {
      const payload: CreateServiceInput = {
        title: title.trim(),
        category,
        pricePerDay: Number(pricePerDay),
        location: location.trim(),
        description: description.trim(),
        contactDetails: contactDetails.trim(),
        imageUrl: imageUrl.trim(),
        availabilityDates: dates.map((d) =>
          isNaN(new Date(d).getTime()) ? d : new Date(d).toISOString()
        ),
      };

      await onSubmit(payload, imageFile);
      onClose();
    } catch (err: any) {
      const respErr = err?.response?.data?.message;
      if (Array.isArray(respErr)) {
        setError(respErr.join(", "));
      } else {
        setError(respErr || err?.message || "Failed to save service");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans text-gray-900">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-8 py-5 border-b border-gray-200 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-black">
              {isEditing ? "Edit Event Service" : "Create New Luxury Service"}
            </h2>
            <p className="text-xs text-gray-500">Fill in the service details for your event catalog.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-black transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmitForm} className="p-8 space-y-6 flex-1">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Title & Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-black">Service Title *</label>
              <input
                type="text"
                placeholder="e.g. Royal Crystal Ballroom"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-black">Service Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-black font-semibold"
              >
                {Object.values(ServiceCategory).map((cat) => (
                  <option key={cat} value={cat}>
                    {getCategoryLabel(cat)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location & Price Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-black">Location *</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. New York, NY"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-black"
                />
                <MapPin className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-black">Price Per Day ($) *</label>
              <input
                type="number"
                min="0"
                placeholder="250"
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value === "" ? "" : Number(e.target.value))}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-black font-semibold"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-black">Contact Details (Phone / Email) *</label>
            <input
              type="text"
              placeholder="+1 555-019-2834"
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-black"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-black">Description *</label>
            <textarea
              rows={3}
              placeholder="Describe the service offerings, amenities, capacity, and features..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-black"
            />
          </div>

          {/* Image Selection (Upload File) */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-black">Service Banner Image</label>
            
            {/* File Upload Box */}
            <label className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-black bg-gray-50 cursor-pointer transition-colors text-center">
              <Upload className="h-6 w-6 text-gray-500 mb-2" />
              <span className="text-xs font-bold text-black">Upload Image File</span>
              <span className="text-[10px] text-gray-500 mt-1 font-medium">PNG, JPG, WEBP (Max 5MB)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Live Preview */}
            {previewUrl && (
              <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(undefined);
                    setImageUrl("");
                    setPreviewUrl("");
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Availability Dates Selection */}
          <div className="space-y-3 pt-2 border-t border-gray-200">
            <label className="text-xs font-bold text-black">Availability Dates *</label>
            
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={newDateInput}
                onChange={(e) => setNewDateInput(e.target.value)}
                className="px-3 py-2 rounded-xl bg-gray-100 border border-gray-200 text-xs focus:outline-none focus:border-black font-semibold"
              />
              <button
                type="button"
                onClick={handleAddDate}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-black hover:text-white border border-gray-200 text-xs font-bold text-black transition-colors flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Add Date
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {dates.map((d, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold text-black"
                >
                  <Calendar className="h-3 w-3 text-gray-500" />
                  <span>{d}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDate(index)}
                    className="text-gray-500 hover:text-red-500 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer Submit Buttons */}
          <div className="pt-6 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-black hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  
                  <span>{isEditing ? "Update Service" : "Publish Service"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
