import { BaseRepository } from '@common/base/base.repository.js';
import { ServiceCategory } from '@common/types/ServiceCategory.js';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceQueryDto } from '@services/dto/ervice-query.dto.js';
import { IServiceRepository } from '@services/interfaces/service.repository.interface.js';
import { Service } from '@services/schemas/service.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class ServiceRepository
  extends BaseRepository<Service>
  implements IServiceRepository
{
  constructor(@InjectModel(Service.name) serviceModel: Model<Service>) {
    super(serviceModel);
  }
  async search(query: ServiceQueryDto): Promise<Service[]> {
    const filter: Record<string, unknown> = {};
    if (query.keyword) {
      filter.$or = [
        { title: { $regex: query.keyword, $options: 'i' } },
        { description: { $regex: query.keyword, $options: 'i' } },
      ];
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.location) {
      filter.location = {
        $regex: query.location,
        $options: 'i',
      };
    }
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filter.pricePerDay = {};

      if (query.minPrice !== undefined) {
        (filter.pricePerDay as Record<string, number>).$gte = query.minPrice;
      }

      if (query.maxPrice !== undefined) {
        (filter.pricePerDay as Record<string, number>).$lte = query.maxPrice;
      }
    }
    return await this._Model.find(filter).exec();
  }
  async findByTitleAndCategory(
    title: string,
    category: ServiceCategory,
  ): Promise<Service | null> {
    return await this._Model
      .findOne({
        title,
        category,
      })
      .exec();
  }
}
