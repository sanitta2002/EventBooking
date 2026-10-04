import type { IBaseRepository } from '@common/base/base.repository.interface.js';
import type { Booking } from '@bookings/schemas/booking.schema.js';
import type { BookingStatus } from '@common/types/booking-status.enum.js';

export interface IBookingRepository extends IBaseRepository<Booking> {
  findAll(): Promise<Booking[]>;

  findOverlappingBooking(
    serviceId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Booking | null>;

  findByUser(userId: string): Promise<Booking[]>;

  findByService(serviceId: string): Promise<Booking[]>;

  updateStatus(id: string, status: BookingStatus): Promise<Booking | null>;
}