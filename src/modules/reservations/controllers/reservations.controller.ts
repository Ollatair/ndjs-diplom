import { Controller, Post, Delete, Get, Body, Param, Query } from '@nestjs/common';
import { ReservationsService } from '../services/reservations.service';
import { Reservation, ReservationDto, ReservationSearchOptions } from '../interfaces/reservations.interface';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async addReservation(@Body() reservationDto: ReservationDto): Promise<Reservation> {
    return this.reservationsService.addReservation(reservationDto);
  }

  @Delete(':id')
  async removeReservation(@Param('id') id: string): Promise<void> {
    return this.reservationsService.removeReservation(id);
  }

  @Get()
  async getReservations(@Query() query: ReservationSearchOptions): Promise<Reservation[]> {
    return this.reservationsService.getReservations(query);
  }
}
