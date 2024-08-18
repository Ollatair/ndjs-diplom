import { Schema } from 'mongoose';

export const HotelSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
}, {
  timestamps: true,
});
