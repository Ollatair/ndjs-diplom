import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, IUserService, SearchUserParams, ID } from '../interfaces/users.interface';

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(data: Partial<User>): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async findById(id: ID): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findAll(params: SearchUserParams): Promise<User[]> {
    const { limit, offset, email, name, contactPhone } = params;
    const query: any = {};

    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    if (contactPhone) {
      query.contactPhone = { $regex: contactPhone, $options: 'i' };
    }

    return this.userModel.find(query).skip(offset).limit(limit).exec();
  }
}
