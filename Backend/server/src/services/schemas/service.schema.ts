import { ServiceCategory } from '@common/types/ServiceCategory.js';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Service {
  _id: Types.ObjectId;
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({
    required: true,
    enum: ServiceCategory,
  })
  category: ServiceCategory;

  @Prop({ required: true, min: 0 })
  pricePerDay: number;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  location: string;

  @Prop({ trim: true })
  imageUrl?: string;

  @Prop({
    type: [Date],
    required: true,
  })
  availabilityDates: Date[];
  @Prop({ required: true, trim: true })
  contactDetails: string;
}

export type ServiceDocument = HydratedDocument<Service>;

export const ServiceSchema = SchemaFactory.createForClass(Service);
