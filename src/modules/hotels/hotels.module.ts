import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsService } from './services/hotels.service';
import { HotelRoomService } from './services/hotel-room.service';
import { HotelsController } from './controllers/hotels.controller';
import { HotelRoomController } from './controllers/hotel-room.controller';
import { HotelSchema } from './schemas/hotels.schema';
import { HotelRoomSchema } from './schemas/hotel-room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Hotel', schema: HotelSchema },
      { name: 'HotelRoom', schema: HotelRoomSchema },
    ]),
  ],
  providers: [HotelsService, HotelRoomService],
  controllers: [HotelsController, HotelRoomController],
  exports: [HotelsService, HotelRoomService],
})
export class HotelsModule {}
