import { Module } from '@nestjs/common';
import { BookingsController } from './controller/bookings.controller.js';
import { BookingsService } from './service/bookings.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema.js';
import { BookingRepository } from './repositories/booking.repository.js';
import { ServicesModule } from '@services/services.module.js';
import { AuthModule } from '@auth/auth.module.js';

@Module({
  imports:[
    AuthModule,
    ServicesModule,
     MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService,
    {
      provide: 'IBookingRepository',
      useClass: BookingRepository,
    },
     {
      provide: 'IBookingsService',
      useClass: BookingsService,
    },
  ],
  exports: ['IBookingRepository'],
})
export class BookingsModule {}
