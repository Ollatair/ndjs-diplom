import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, IHotelService, SearchHotelParams, UpdateHotelParams, ID } from '../interfaces/hotels.interface';

@Injectable()
export class HotelsService implements IHotelService {
  constructor(@InjectModel('Hotel') private hotelModel: Model<Hotel>) {}

  async create(data: Partial<Hotel>): Promise<Hotel> {
    const hotel = new this.hotelModel(data);
    return hotel.save();
  }

  async findById(id: ID): Promise<Hotel> {
    const hotel = await this.hotelModel.findById(id).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    return hotel;
  }

  async search(params: SearchHotelParams): Promise<Hotel[]> {
    const { limit, offset, title } = params;
    const query: any = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    return this.hotelModel.find(query).skip(offset).limit(limit).exec();
  }

  async update(id: ID, data: UpdateHotelParams): Promise<Hotel> {
    const hotel = await this.hotelModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    return hotel;
  }
}
