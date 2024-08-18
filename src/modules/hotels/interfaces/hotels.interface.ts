import { Document, Types } from 'mongoose';

export type ID = string | Types.ObjectId;

export interface Hotel extends Document {
  _id: ID;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchHotelParams {
  limit: number;
  offset: number;
  title?: string;
}

export interface UpdateHotelParams {
  title?: string;
  description?: string;
}

export interface IHotelService {
  create(data: Partial<Hotel>): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: ID, data: UpdateHotelParams): Promise<Hotel>;
}
