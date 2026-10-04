import { ServiceCategory } from '@common/types/ServiceCategory.js';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(ServiceCategory)
  category?: ServiceCategory;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pricePerDay?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
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
  availabilityDates?: string[];

  @IsOptional()
  @IsString()
  contactDetails?: string;
}
