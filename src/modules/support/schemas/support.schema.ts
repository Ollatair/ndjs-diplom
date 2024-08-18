import { Schema } from 'mongoose';

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true },
  sentAt: { type: Date, required: true },
  text: { type: String, required: true },
  readAt: { type: Date, default: null },
});

export const SupportRequestSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  messages: [MessageSchema],
  isActive: { type: Boolean, default: true },
});
