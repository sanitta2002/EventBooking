import type { CreateBookingDto } from '@bookings/dto/create-booking.dto.js';
import type { BookingResponseDto } from '@bookings/dto/booking-response.dto.js';
import type { BookingStatus } from '@common/types/booking-status.enum.js';

export interface IBookingsService {
  create(
    userId: string,
    dto: CreateBookingDto,
  ): Promise<BookingResponseDto>;

  findAll(): Promise<BookingResponseDto[]>;

  findByUser(userId: string): Promise<BookingResponseDto[]>;

  findByService(serviceId: string): Promise<BookingResponseDto[]>;

  updateStatus(id: string, status: BookingStatus): Promise<BookingResponseDto>;

  cancelBooking(userId: string, bookingId: string): Promise<BookingResponseDto>;
}