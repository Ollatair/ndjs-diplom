import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
