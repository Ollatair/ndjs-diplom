import { Controller, Post, Delete, Get, Body, Param, Query } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { Reservation } from './schemas/reservation.schema';
import { ReservationDto, ReservationSearchOptions } from './interfaces/reservation.interface';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async addReservation(@Body() reservationDto: ReservationDto): Promise<Reservation> {
    return this.reservationService.addReservation(reservationDto);
  }

  @Delete(':id')
  async removeReservation(@Param('id') id: string): Promise<void> {
    return this.reservationService.removeReservation(id);
  }

  @Get()
  async getReservations(@Query() query: ReservationSearchOptions): Promise<Reservation[]> {
    const filter: ReservationSearchOptions = {
      userId: query.userId,
      dateStart: new Date(query.dateStart),
      dateEnd: new Date(query.dateEnd),
    };
    return this.reservationService.getReservations(filter);
  }
}
