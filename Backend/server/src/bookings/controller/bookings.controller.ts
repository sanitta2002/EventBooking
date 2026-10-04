import { CreateBookingDto } from '@bookings/dto/create-booking.dto.js';
import type { IBookingsService } from '@bookings/interfaces/bookings.service.interface.js';
import { AdminGuard } from '@common/guards/admin.guard.js';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard.js';
import type { AuthRequest } from '@common/types/auth-request.type.js';
import { BookingStatus } from '@common/types/booking-status.enum.js';
import { Body, Controller, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

@Controller('bookings')
export class BookingsController {
     constructor(
    @Inject('IBookingsService')
    private readonly _bookingsService: IBookingsService,
  ) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() request: AuthRequest,
    @Body() dto: CreateBookingDto,
  ) {
    return await this._bookingsService.create(
      request.user.userId,
      dto,
    );
  }
  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findAll() {
    return await this._bookingsService.findAll();
  }

  @Get('mybooking')
  @UseGuards(JwtAuthGuard)
  async findMyBookings(
    @Req() request: AuthRequest,
  ) {
    return await this._bookingsService.findByUser(
      request.user.userId,
    );
  }

  @Get('service/:serviceId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findByService(
    @Param('serviceId') serviceId: string,
  ) {
    return await this._bookingsService.findByService(
      serviceId,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: BookingStatus,
  ) {
    return await this._bookingsService.updateStatus(id, status);
  }

  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard)
  async cancelBooking(
    @Req() request: AuthRequest,
    @Param('id') id: string,
  ) {
    return await this._bookingsService.cancelBooking(
      request.user.userId,
      id,
    );
  }
}
