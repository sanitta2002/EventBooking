import { BookingResponseDto } from '@bookings/dto/booking-response.dto.js';
import { Booking } from '@bookings/schemas/booking.schema.js';

interface PopulatedUser {
  _id: { toString(): string };
  name: string;
  email: string;
}

interface PopulatedService {
  _id: { toString(): string };
  title: string;
  category?: string;
  pricePerDay?: number;
  location?: string;
}

export class BookingMapper {
  static toResponse(booking: Booking): BookingResponseDto {
    const rawUser = booking.userId as unknown as PopulatedUser | { toString(): string };
    const rawService = booking.serviceId as unknown as PopulatedService | { toString(): string };

    const isPopulatedUser = typeof rawUser === 'object' && rawUser !== null && 'name' in rawUser;
    const isPopulatedService = typeof rawService === 'object' && rawService !== null && 'title' in rawService;

    const userObj = isPopulatedUser ? (rawUser as PopulatedUser) : null;
    const serviceObj = isPopulatedService ? (rawService as PopulatedService) : null;

    return {
      id: booking._id.toString(),
      userId: userObj ? userObj._id.toString() : rawUser.toString(),
      serviceId: serviceObj ? serviceObj._id.toString() : rawService.toString(),
      user: userObj
        ? { id: userObj._id.toString(), name: userObj.name, email: userObj.email }
        : undefined,
      service: serviceObj
        ? {
            id: serviceObj._id.toString(),
            title: serviceObj.title,
            category: serviceObj.category,
            pricePerDay: serviceObj.pricePerDay,
            location: serviceObj.location,
          }
        : undefined,

      startDate: booking.startDate,
      endDate: booking.endDate,

      numberOfDays: booking.numberOfDays,
      pricePerDay: booking.pricePerDay,
      totalPrice: booking.totalPrice,

      status: booking.status,
      createdAt: booking.createdAt,
    };
  }
}