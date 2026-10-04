export const ServiceCategory = {
  VENUE: 'venue',
  CATERER: 'caterer',
  DJ: 'dj',
  PHOTOGRAPHER: 'photographer',
  DECORATOR: 'decorator',
  EVENT_PLANNER: 'event-planner',
  MAKEUP_ARTIST: 'makeup-artist',
  MUSIC_BAND: 'music-band',
  LIGHTING: 'lighting',
  SOUND_SYSTEM: 'sound-system',
} as const;

export type ServiceCategory = typeof ServiceCategory[keyof typeof ServiceCategory];

export interface EventService {
  id: string;
  _id?: string;
  title: string;
  category: ServiceCategory;
  pricePerDay: number;
  description: string;
  location: string;
  imageUrl?: string;
  availabilityDates: string[];
  contactDetails: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceQueryParams {
  keyword?: string;
  category?: ServiceCategory | '';
  minPrice?: number;
  maxPrice?: number;
}

export interface CreateServiceInput {
  title: string;
  category: ServiceCategory;
  pricePerDay: number;
  description: string;
  location: string;
  imageUrl?: string;
  availabilityDates: string[];
  contactDetails: string;
}

export interface UpdateServiceInput {
  title?: string;
  category?: ServiceCategory;
  pricePerDay?: number;
  description?: string;
  location?: string;
  imageUrl?: string;
  availabilityDates?: string[];
  contactDetails?: string;
}
