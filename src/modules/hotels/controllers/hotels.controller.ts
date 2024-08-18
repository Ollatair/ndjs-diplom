import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { HotelsService } from '../services/hotels.service';
import { Hotel, SearchHotelParams, UpdateHotelParams } from '../interfaces/hotels.interface';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  async create(@Body() hotelData: Partial<Hotel>): Promise<Hotel> {
    return this.hotelsService.create(hotelData);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Hotel> {
    return this.hotelsService.findById(id);
  }

  @Get()
  async search(@Query() query: SearchHotelParams): Promise<Hotel[]> {
    return this.hotelsService.search(query);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateHotelParams): Promise<Hotel> {
    return this.hotelsService.update(id, updateData);
  }
}
