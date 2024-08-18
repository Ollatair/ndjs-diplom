import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDto, ReservationSearchOptions, IReservation, ID } from '../interfaces/reservations.interface';

@Injectable()
export class ReservationsService implements IReservation {
  constructor(
    @InjectModel('Reservation') private reservationModel: Model<Reservation>,
  ) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    const { roomId, dateStart, dateEnd } = data;

    const conflictingReservations = await this.reservationModel.find({
      roomId,
      $or: [
        { dateStart: { $lt: dateEnd, $gte: dateStart } },
        { dateEnd: { $gt: dateStart, $lte: dateEnd } },
        { dateStart: { $lte: dateStart }, dateEnd: { $gte: dateEnd } },
      ],
    });

    if (conflictingReservations.length > 0) {
      throw new ConflictException('Room is not available for the selected dates');
    }

    const reservation = new this.reservationModel(data);
    return reservation.save();
  }

  async removeReservation(id: ID): Promise<void> {
    await this.reservationModel.findByIdAndDelete(id).exec();
  }

  async getReservations(filter: ReservationSearchOptions): Promise<Reservation[]> {
    return this.reservationModel.find({
      userId: filter.userId,
      dateStart: { $gte: filter.dateStart },
      dateEnd: { $lte: filter.dateEnd },
    }).exec();
  }
}
