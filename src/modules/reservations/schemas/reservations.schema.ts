import { Schema } from 'mongoose';

export const ReservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  hotelId: { type: Schema.Types.ObjectId, required: true },
  roomId: { type: Schema.Types.ObjectId, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
}, {
  timestamps: true,
});
