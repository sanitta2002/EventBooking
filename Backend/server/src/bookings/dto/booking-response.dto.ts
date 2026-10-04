import { BookingStatus } from '@common/types/booking-status.enum.js';

export class BookingResponseDto {
  id: string;
  userId: string;
  serviceId: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  service?: {
    id: string;
    title: string;
    category?: string;
    pricePerDay?: number;
    location?: string;
  };

  startDate: Date;
  endDate: Date;

  numberOfDays: number;
  pricePerDay: number;
  totalPrice: number;

  status: BookingStatus;
  createdAt: Date;
}