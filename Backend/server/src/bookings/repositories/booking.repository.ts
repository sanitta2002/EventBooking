import { IBookingRepository } from '@bookings/interfaces/booking.repository.interface.js';
import { Booking } from '@bookings/schemas/booking.schema.js';
import { BaseRepository } from '@common/base/base.repository.js';
import { BookingStatus } from '@common/types/booking-status.enum.js';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class BookingRepository
  extends BaseRepository<Booking>
  implements IBookingRepository, OnModuleInit
{
  constructor(@InjectModel(Booking.name) bookingModel: Model<Booking>) {
    super(bookingModel);
  }

  async onModuleInit() {
    try {
      await this._Model.collection.dropIndex('serviceId_1_bookingDate_1');
    } catch {
      
    }
  }
  async findById(id: string): Promise<Booking | null> {
    const query = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : id;
    return await this._Model
      .findById(query)
      .populate('userId', 'name email')
      .populate('serviceId', 'title category pricePerDay location')
      .exec();
  }

  async findAll(): Promise<Booking[]> {
    return await this._Model
      .find()
      .populate('userId', 'name email')
      .populate('serviceId', 'title category pricePerDay location')
      .exec();
  }

  async findOverlappingBooking(
    serviceId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Booking | null> {
    const serviceObjId = Types.ObjectId.isValid(serviceId)
      ? new Types.ObjectId(serviceId)
      : serviceId;
    return this._Model
      .findOne({
        $or: [{ serviceId: serviceObjId }, { serviceId }],
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
      })
      .exec();
  }

  async findByUser(userId: string): Promise<Booking[]> {
    const filter = Types.ObjectId.isValid(userId)
      ? { $or: [{ userId: new Types.ObjectId(userId) }, { userId: userId }] }
      : { userId };
    return await this._Model
      .find(filter)
      .populate('userId', 'name email')
      .populate('serviceId', 'title category pricePerDay location')
      .exec();
  }

  async findByService(serviceId: string): Promise<Booking[]> {
    const filter = Types.ObjectId.isValid(serviceId)
      ? { $or: [{ serviceId: new Types.ObjectId(serviceId) }, { serviceId: serviceId }] }
      : { serviceId };
    return await this._Model
      .find(filter)
      .populate('userId', 'name email')
      .populate('serviceId', 'title category pricePerDay location')
      .exec();
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking | null> {
    const query = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : id;
    return await this._Model
      .findByIdAndUpdate(query, { status }, { new: true })
      .populate('userId', 'name email')
      .populate('serviceId', 'title category pricePerDay location')
      .exec();
  }
}

