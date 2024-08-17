import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { IUserService, SearchUserParams } from './interfaces/user-service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(params: SearchUserParams): Promise<User[]> {
    const { limit, offset, email, name, contactPhone } = params;

    const query = this.userModel.find();

    if (email) {
      query.where('email').regex(new RegExp(email, 'i'));
    }

    if (name) {
      query.where('name').regex(new RegExp(name, 'i'));
    }

    if (contactPhone) {
      query.where('contactPhone').regex(new RegExp(contactPhone, 'i'));
    }

    return query.skip(offset).limit(limit).exec();
  }
}
