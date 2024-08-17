import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelRoom, HotelRoomDocument } from './schemas/hotel-room.schema';
import { SearchRoomsParams, IHotelRoomService } from './interfaces/hotel-room-service.interface';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(@InjectModel(HotelRoom.name) private hotelRoomModel: Model<HotelRoomDocument>) {}

  async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const newRoom = new this.hotelRoomModel(data);
    return newRoom.save();
  }

  async findById(id: string): Promise<HotelRoom> {
    return this.hotelRoomModel.findById(id).exec();
  }

  async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    const { limit, offset, hotel, isEnabled } = params;
    const query = this.hotelRoomModel.find({ hotel });

    if (typeof isEnabled === 'boolean') {
      query.where('isEnabled').equals(isEnabled);
    }

    return query.skip(offset).limit(limit).exec();
  }

  async update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.hotelRoomModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
