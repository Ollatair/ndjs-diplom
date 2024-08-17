import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { HotelService } from './hotels.service';
import { Hotel } from './schemas/hotel.schema';
import { SearchHotelParams, UpdateHotelParams } from './interfaces/hotel-service.interface';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  async create(@Body() createHotelDto: Partial<Hotel>): Promise<Hotel> {
    return this.hotelService.create(createHotelDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Hotel> {
    return this.hotelService.findById(id);
  }

  @Get()
  async search(@Query() query: Partial<SearchHotelParams>): Promise<Hotel[]> {
    const params: SearchHotelParams = {
      limit: Number(query.limit) || 10,
      offset: Number(query.offset) || 0,
      title: query.title || '',
    };
    return this.hotelService.search(params);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelParams): Promise<Hotel> {
    return this.hotelService.update(id, updateHotelDto);
  }
}
