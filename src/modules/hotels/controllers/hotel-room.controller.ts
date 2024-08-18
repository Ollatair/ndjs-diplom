import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { HotelRoomService } from '../services/hotel-room.service';
import { HotelRoom, SearchRoomsParams } from '../interfaces/hotel-room.interface';

@Controller('hotel-rooms')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post()
  async create(@Body() roomData: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.hotelRoomService.create(roomData);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<HotelRoom> {
    return this.hotelRoomService.findById(id);
  }

  @Get()
  async search(@Query() query: SearchRoomsParams): Promise<HotelRoom[]> {
    return this.hotelRoomService.search(query);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.hotelRoomService.update(id, updateData);
  }
}
