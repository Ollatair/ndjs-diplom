import { Schema, Types } from 'mongoose';

export const HotelRoomSchema = new Schema({
  hotel: { type: Types.ObjectId, ref: 'Hotel', required: true },
  description: { type: String },
  images: { type: [String], default: [] },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
  isEnabled: { type: Boolean, required: true, default: true },
}, {
  timestamps: true,
});
