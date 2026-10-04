import type { Service } from '@services/schemas/service.schema.js';
import type { ServiceResponseDto } from '@services/dto/service-response.dto.js';

export class ServiceMapper {
  static toResponse(service: Service): ServiceResponseDto {
    return {
      id: service._id.toString(),
      title: service.title,
      category: service.category,
      pricePerDay: service.pricePerDay,
      description: service.description,
      location:service.location,
      availabilityDates: service.availabilityDates,
      contactDetails: service.contactDetails,
      imageUrl: service.imageUrl,
    };
  }
}