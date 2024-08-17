import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './schemas/user.schema';
import { SearchUserParams } from './interfaces/user-service.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: Partial<User>): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Get()
  async findAll(@Query() query: Partial<SearchUserParams>): Promise<User[]> {
    const params: SearchUserParams = {
      limit: Number(query.limit) || 10,
      offset: Number(query.offset) || 0,
      email: query.email || '',
      name: query.name || '',
      contactPhone: query.contactPhone || '',
    };
    return this.userService.findAll(params);
  }
}
