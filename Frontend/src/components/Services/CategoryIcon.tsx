import React from "react";
import {
  Building2,
  Utensils,
  Disc3,
  Camera,
  Sparkles,
  CalendarCheck,
  Palette,
  Music2,
  Sun,
  Volume2,
  HelpCircle,
} from "lucide-react";
import { ServiceCategory } from "../../types/service";

interface CategoryIconProps {
  category: ServiceCategory | string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = "h-4 w-4" }) => {
  switch (category) {
    case ServiceCategory.VENUE:
      return <Building2 className={className} />;
    case ServiceCategory.CATERER:
      return <Utensils className={className} />;
    case ServiceCategory.DJ:
      return <Disc3 className={className} />;
    case ServiceCategory.PHOTOGRAPHER:
      return <Camera className={className} />;
    case ServiceCategory.DECORATOR:
      return <Sparkles className={className} />;
    case ServiceCategory.EVENT_PLANNER:
      return <CalendarCheck className={className} />;
    case ServiceCategory.MAKEUP_ARTIST:
      return <Palette className={className} />;
    case ServiceCategory.MUSIC_BAND:
      return <Music2 className={className} />;
    case ServiceCategory.LIGHTING:
      return <Sun className={className} />;
    case ServiceCategory.SOUND_SYSTEM:
      return <Volume2 className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};

export const getCategoryLabel = (category: ServiceCategory | string): string => {
  switch (category) {
    case ServiceCategory.VENUE:
      return "Luxury Venue";
    case ServiceCategory.CATERER:
      return "Gourmet Catering";
    case ServiceCategory.DJ:
      return "Pro DJ & Audio";
    case ServiceCategory.PHOTOGRAPHER:
      return "Photography & Film";
    case ServiceCategory.DECORATOR:
      return "Floral & Decor";
    case ServiceCategory.EVENT_PLANNER:
      return "Event Planning";
    case ServiceCategory.MAKEUP_ARTIST:
      return "Styling & Makeup";
    case ServiceCategory.MUSIC_BAND:
      return "Live Music Band";
    case ServiceCategory.LIGHTING:
      return "Atmospheric Lighting";
    case ServiceCategory.SOUND_SYSTEM:
      return "Sound & Stage";
    default:
      return String(category).replace(/-/g, " ");
  }
};
