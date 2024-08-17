import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { HotelRoomService } from './hotel-rooms.service';
import { HotelRoom } from './schemas/hotel-room.schema';
import { SearchRoomsParams } from './interfaces/hotel-room-service.interface';

@Controller('hotel-rooms')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post()
  async create(@Body() createRoomDto: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.hotelRoomService.create(createRoomDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<HotelRoom> {
    return this.hotelRoomService.findById(id);
  }

  @Get()
  async search(
    @Query() query: Partial<SearchRoomsParams>,
  ): Promise<HotelRoom[]> {
    const params: SearchRoomsParams = {
      limit: Number(query.limit) || 10,
      offset: Number(query.offset) || 0,
      hotel: query.hotel,
      isEnabled:
        query.isEnabled !== undefined
          ? String(query.isEnabled).toLowerCase() === 'true'
          : undefined,
    };
    return this.hotelRoomService.search(params);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoomDto: Partial<HotelRoom>,
  ): Promise<HotelRoom> {
    return this.hotelRoomService.update(id, updateRoomDto);
  }
}
