import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { IHotelService, SearchHotelParams, UpdateHotelParams } from './interfaces/hotel-service.interface';

@Injectable()
export class HotelService implements IHotelService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>) {}

  async create(data: Partial<Hotel>): Promise<Hotel> {
    const newHotel = new this.hotelModel(data);
    return newHotel.save();
  }

  async findById(id: string): Promise<Hotel> {
    return this.hotelModel.findById(id).exec();
  }

  async search(params: SearchHotelParams): Promise<Hotel[]> {
    const { limit, offset, title } = params;
    const query = this.hotelModel.find();

    if (title) {
      query.where('title').regex(new RegExp(title, 'i'));
    }

    return query.skip(offset).limit(limit).exec();
  }

  async update(id: string, data: UpdateHotelParams): Promise<Hotel> {
    return this.hotelModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
