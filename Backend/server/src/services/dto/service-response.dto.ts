import { ServiceCategory } from '@common/types/ServiceCategory.js';

export class ServiceResponseDto {
  id: string;
  title: string;
  category: ServiceCategory;
  pricePerDay: number;
  description: string;
  location: string;

  availabilityDates: Date[];
  contactDetails: string;
  imageUrl?: string;
}
