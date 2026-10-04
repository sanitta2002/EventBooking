
import { CreateServiceDto } from '@services/dto/create-service.dto.js';
import { ServiceQueryDto } from '@services/dto/ervice-query.dto.js';
import type { ServiceResponseDto } from '@services/dto/service-response.dto.js';
import { UpdateServiceDto } from '@services/dto/update-service.dto.js';

export interface IServicesService {
  create(
    dto: CreateServiceDto,
    image?: {
      buffer: Buffer;
      mimetype: string;
    },
  ): Promise<ServiceResponseDto>;

  search(query: ServiceQueryDto): Promise<ServiceResponseDto[]>;
  update(
  id: string,
  dto: UpdateServiceDto,
  image?: {
    buffer: Buffer;
    mimetype: string;
  },
): Promise<ServiceResponseDto>;
delete(id: string): Promise<void>;
}