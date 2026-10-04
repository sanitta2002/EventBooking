import { BookingStatus } from '@common/types/booking-status.enum.js';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Booking {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  userId: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Service',
  })
  serviceId: Types.ObjectId;

  @Prop({
    required: true,
    type: Date,
  })
  startDate: Date;

  @Prop({
    required: true,
    type: Date,
  })
  endDate: Date;

  @Prop({
    required: true,
    min: 1,
  })
  numberOfDays: number;

  @Prop({
    required: true,
    min: 0,
  })
  pricePerDay: number;

  @Prop({
    required: true,
    min: 0,
  })
  totalPrice: number;

  @Prop({
    required: true,
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  createdAt: Date;
  updatedAt: Date;
}

export type BookingDocument = HydratedDocument<Booking>;

export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.index(
  { serviceId: 1, startDate: 1, endDate: 1 },
);