import { Module } from '@nestjs/common';
import { BookingsController } from './controller/bookings.controller.js';
import { BookingsService } from './service/bookings.service.js';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
