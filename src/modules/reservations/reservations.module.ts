import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsService } from './services/reservations.service';
import { ReservationsController } from './controllers/reservations.controller';
import { ReservationSchema } from './schemas/reservations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reservation', schema: ReservationSchema }]),
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
  exports: [ReservationsService],
})
export class ReservationsModule {}
