import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactPhone?: string;

  @Prop({ required: true, default: 'client' })
  role: 'client' | 'admin' | 'manager';
}

export const UserSchema = SchemaFactory.createForClass(User);
