import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { IReservation, ReservationDto, ReservationSearchOptions } from './interfaces/reservation.interface';

@Injectable()
export class ReservationService implements IReservation {
  constructor(@InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    // Проверка на доступность номера
    const conflictingReservation = await this.reservationModel.findOne({
      roomId: data.roomId,
      hotelId: data.hotelId,
      $or: [
        { $and: [{ dateStart: { $lte: data.dateEnd } }, { dateEnd: { $gte: data.dateStart } }] }
      ]
    }).exec();

    if (conflictingReservation) {
      throw new BadRequestException('The room is already reserved for the selected dates.');
    }

    const newReservation = new this.reservationModel(data);
    return newReservation.save();
  }

  async removeReservation(id: string): Promise<void> {
    const result = await this.reservationModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new BadRequestException('Reservation not found.');
    }
  }

  async getReservations(filter: ReservationSearchOptions): Promise<Reservation[]> {
    const { userId, dateStart, dateEnd } = filter;
    return this.reservationModel.find({
      userId,
      dateStart: { $gte: dateStart },
      dateEnd: { $lte: dateEnd }
    }).exec();
  }
}
