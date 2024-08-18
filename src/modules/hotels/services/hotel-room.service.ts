import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelRoom, IHotelRoomService, SearchRoomsParams, ID } from '../interfaces/hotel-room.interface';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(@InjectModel('HotelRoom') private hotelRoomModel: Model<HotelRoom>) {}

  async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const room = new this.hotelRoomModel(data);
    return room.save();
  }

  async findById(id: ID): Promise<HotelRoom> {
    const room = await this.hotelRoomModel.findById(id).exec();
    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
    return room;
  }

  async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    const { limit, offset, hotel, isEnabled } = params;
    const query: any = { hotel };

    if (typeof isEnabled === 'boolean') {
      query.isEnabled = isEnabled;
    }

    return this.hotelRoomModel.find(query).skip(offset).limit(limit).exec();
  }

  async update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
    const room = await this.hotelRoomModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
    return room;
  }
}
