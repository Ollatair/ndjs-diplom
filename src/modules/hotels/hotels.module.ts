import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelService } from './hotels.service';
import { HotelRoomService } from './hotel-rooms.service';
import { HotelController } from './hotels.controller';
import { HotelRoomController } from './hotel-rooms.controller';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    MongooseModule.forFeature([{ name: HotelRoom.name, schema: HotelRoomSchema }]),
  ],
  controllers: [HotelController, HotelRoomController],
  providers: [HotelService, HotelRoomService],
  exports: [HotelService, HotelRoomService],
})
export class HotelsModule {}
