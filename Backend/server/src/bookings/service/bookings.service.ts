import { BookingResponseDto } from '@bookings/dto/booking-response.dto.js';
import { CreateBookingDto } from '@bookings/dto/create-booking.dto.js';
import type { IBookingRepository } from '@bookings/interfaces/booking.repository.interface.js';
import { IBookingsService } from '@bookings/interfaces/bookings.service.interface.js';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { IServiceRepository } from '@services/interfaces/service.repository.interface.js';
import { BOOKING_MESSAGES } from '../../constants/message.constant.js';
import { Types } from 'mongoose';
import { BookingMapper } from '@bookings/mappers/booking.mapper.js';
import { BookingStatus } from '@common/types/booking-status.enum.js';
@Injectable()
export class BookingsService implements IBookingsService {
  constructor(
    @Inject('IBookingRepository')
    private readonly _bookingRepository: IBookingRepository,
    @Inject('IServiceRepository')
    private _serviceRepository: IServiceRepository,
  ) {}
  async create(
    userId: string,
    dto: CreateBookingDto,
  ): Promise<BookingResponseDto> {
    const service = await this._serviceRepository.findById(dto.serviceId);
    if (!service) {
      throw new NotFoundException(BOOKING_MESSAGES.SERVICE_NOT_FOUND);
    }
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    if (startDate > endDate) {
      throw new ConflictException(BOOKING_MESSAGES.INVALID_DATE_RANGE);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      throw new ConflictException(BOOKING_MESSAGES.PAST_DATE_NOT_ALLOWED);
    }

    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const numberOfDays =
      Math.floor(
        (endDate.getTime() - startDate.getTime()) / millisecondsPerDay,
      ) + 1;

    for (let index = 0; index < numberOfDays; index++) {
      const requestedDate = new Date(startDate);

      requestedDate.setDate(startDate.getDate() + index);

      if (!this.isDateAvailable(service.availabilityDates, requestedDate)) {
        throw new ConflictException(BOOKING_MESSAGES.SERVICE_NOT_AVAILABLE);
      }
    }
    const existingBooking =
      await this._bookingRepository.findOverlappingBooking(
        dto.serviceId,
        startDate,
        endDate,
      );

    if (existingBooking) {
      throw new ConflictException(BOOKING_MESSAGES.SERVICE_ALREADY_BOOKED);
    }

    const totalPrice = service.pricePerDay * numberOfDays;

    const booking = await this._bookingRepository.create({
      userId: new Types.ObjectId(userId),
      serviceId: new Types.ObjectId(dto.serviceId),
      startDate,
      endDate,
      numberOfDays,
      pricePerDay: service.pricePerDay,
      totalPrice,
    });

    const populatedBooking = await this._bookingRepository.findById(booking._id.toString());
    return BookingMapper.toResponse(populatedBooking || booking);
  }
  async findAll(): Promise<BookingResponseDto[]> {
    const bookings = await this._bookingRepository.findAll();

    return bookings.map((booking) => BookingMapper.toResponse(booking));
  }
  async findByService(serviceId: string): Promise<BookingResponseDto[]> {
    const bookings = await this._bookingRepository.findByService(serviceId);

    return bookings.map((booking) => BookingMapper.toResponse(booking));
  }
  async findByUser(userId: string): Promise<BookingResponseDto[]> {
    const bookings = await this._bookingRepository.findByUser(userId);

    return bookings.map((booking) => BookingMapper.toResponse(booking));
  }
  async updateStatus(id: string, status: BookingStatus): Promise<BookingResponseDto> {
    const existing = await this._bookingRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Booking not found');
    }

    if (existing.status === BookingStatus.CANCELLED) {
      throw new ConflictException('Cannot update the status of a cancelled booking');
    }

    const booking = await this._bookingRepository.updateStatus(id, status);
    return BookingMapper.toResponse(booking || existing);
  }

  async cancelBooking(userId: string, bookingId: string): Promise<BookingResponseDto> {
    const booking = await this._bookingRepository.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const rawUser = booking.userId as unknown as { _id?: { toString(): string }; toString(): string };
    const bookingUserId = rawUser && typeof rawUser === 'object' && '_id' in rawUser && rawUser._id
      ? rawUser._id.toString()
      : rawUser.toString();

    if (bookingUserId !== userId) {
      throw new UnauthorizedException('You can only cancel your own bookings');
    }

    if (booking.status === BookingStatus.CANCELLED) {
      throw new ConflictException('Booking is already cancelled');
    }

    const updatedBooking = await this._bookingRepository.updateStatus(bookingId, BookingStatus.CANCELLED);
    return BookingMapper.toResponse(updatedBooking || booking);
  }
  private isDateAvailable(availabilityDates: Date[], date: Date): boolean {
    const targetDate = date.toISOString().slice(0, 10);

    return availabilityDates.some(
      (availableDate) =>
        availableDate.toISOString().slice(0, 10) === targetDate,
    );
  }
}
