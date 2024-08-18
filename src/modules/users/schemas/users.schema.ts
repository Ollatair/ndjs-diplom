import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  contactPhone: { type: String },
  role: { type: String, required: true, default: 'client', enum: ['client', 'admin', 'manager'] },
}, {
  timestamps: true,
});
