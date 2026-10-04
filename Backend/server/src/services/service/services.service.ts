import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from '@services/dto/create-service.dto.js';
import { ServiceQueryDto } from '@services/dto/ervice-query.dto.js';
import { ServiceResponseDto } from '@services/dto/service-response.dto.js';
import type { IServiceRepository } from '@services/interfaces/service.repository.interface.js';
import { IServicesService } from '@services/interfaces/services.service.interface.js';
import { ServiceMapper } from '@services/mapper/service.mapper.js';
import { SERVICE_MESSAGES } from '../../constants/message.constant.js';
import type { ICloudinaryService } from '@common/interfaces/cloudinary.service.interface.js';
import { UpdateServiceDto } from '@services/dto/update-service.dto.js';

@Injectable()
export class ServicesService implements IServicesService {
  constructor(
    @Inject('IServiceRepository')
    private readonly _serviceRepository: IServiceRepository,
    @Inject('ICloudinaryService')
    private readonly _cloudinaryService: ICloudinaryService,
  ) {}
  async create(
    dto: CreateServiceDto,
    image?: {
      buffer: Buffer;
      mimetype: string;
    },
  ): Promise<ServiceResponseDto> {
    const existingService =
      await this._serviceRepository.findByTitleAndCategory(
        dto.title,
        dto.category,
      );
    if (existingService) {
      throw new ConflictException(SERVICE_MESSAGES.SERVICE_ALREADY_EXISTS);
    }
    let imageUrl = dto.imageUrl;
    if (image) {
      imageUrl = await this._cloudinaryService.uploadImage(image);
    }
    
    let parsedDates: Date[] = [];
    if (Array.isArray(dto.availabilityDates)) {
      parsedDates = dto.availabilityDates.map((date) => new Date(date));
    } else if (typeof dto.availabilityDates === 'string') {
      try {
        const jsonDates = JSON.parse(dto.availabilityDates);
        if (Array.isArray(jsonDates)) {
          parsedDates = jsonDates.map((d: string) => new Date(d));
        } else {
          parsedDates = [new Date(dto.availabilityDates)];
        }
      } catch {
        parsedDates = (dto.availabilityDates as string)
          .split(',')
          .map((d) => new Date(d.trim()));
      }
    }

    const service = await this._serviceRepository.create({
      title: dto.title,
      category: dto.category,
      pricePerDay: dto.pricePerDay,
      description: dto.description,
      availabilityDates: parsedDates,
      location: dto.location,
      contactDetails: dto.contactDetails,
      imageUrl,
    });

    return ServiceMapper.toResponse(service);
  }
  async search(query: ServiceQueryDto): Promise<ServiceResponseDto[]> {
    const services = await this._serviceRepository.search(query);

    return services.map((service) => ServiceMapper.toResponse(service));
  }
  async update(
    id: string,
    dto: UpdateServiceDto,
    image?: { buffer: Buffer; mimetype: string },
  ): Promise<ServiceResponseDto> {
    const existingService = await this._serviceRepository.findById(id);

    if (!existingService) {
      throw new NotFoundException(SERVICE_MESSAGES.SERVICE_NOT_FOUND);
    }
    let imageUrl = dto.imageUrl ?? existingService.imageUrl;

    if (image) {
      imageUrl = await this._cloudinaryService.uploadImage(image);
    }

    let parsedDates: Date[] | undefined = undefined;
    if (dto.availabilityDates) {
      if (Array.isArray(dto.availabilityDates)) {
        parsedDates = dto.availabilityDates.map((date) => new Date(date));
      } else if (typeof dto.availabilityDates === 'string') {
        try {
          const jsonDates = JSON.parse(dto.availabilityDates);
          if (Array.isArray(jsonDates)) {
            parsedDates = jsonDates.map((d: string) => new Date(d));
          } else {
            parsedDates = [new Date(dto.availabilityDates)];
          }
        } catch {
          parsedDates = (dto.availabilityDates as string)
            .split(',')
            .map((d) => new Date(d.trim()));
        }
      }
    }

    const updatedService = await this._serviceRepository.updateById(id, {
      ...dto,
      availabilityDates: parsedDates,
      imageUrl,
    });

    if (!updatedService) {
      throw new NotFoundException(SERVICE_MESSAGES.SERVICE_NOT_FOUND);
    }

    return ServiceMapper.toResponse(updatedService);
  }
  async delete(id: string): Promise<void> {
       const existingService =
    await this._serviceRepository.findById(id);

  if (!existingService) {
    throw new NotFoundException(
      SERVICE_MESSAGES.SERVICE_NOT_FOUND,
    );
  }

  await this._serviceRepository.deleteById(id);
  }
}
