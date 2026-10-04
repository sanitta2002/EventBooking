import { ServiceCategory } from '@common/types/ServiceCategory.js';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(ServiceCategory)
  category: ServiceCategory;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pricePerDay: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed.map((d) => {
            const date = new Date(d);
            return isNaN(date.getTime()) ? d : date.toISOString();
          });
        }
      } catch {
        return value.split(',').map((v) => {
          const date = new Date(v.trim());
          return isNaN(date.getTime()) ? v.trim() : date.toISOString();
        });
      }
      const date = new Date(value);
      return [isNaN(date.getTime()) ? value : date.toISOString()];
    }
    if (Array.isArray(value)) {
      return value.map((d) => {
        const date = new Date(d);
        return isNaN(date.getTime()) ? d : date.toISOString();
      });
    }
    return value;
  })
  @IsArray()
  @IsDateString({}, { each: true })
  availabilityDates: string[];

  @IsString()
  @IsNotEmpty()
  contactDetails: string;
}
