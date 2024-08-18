import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User, SearchUserParams } from '../interfaces/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Get()
  async findAll(@Query() query: SearchUserParams): Promise<User[]> {
    return this.usersService.findAll(query);
  }
}
