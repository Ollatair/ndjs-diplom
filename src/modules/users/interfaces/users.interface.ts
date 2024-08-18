import { Document, Types } from 'mongoose';

export type ID = string | Types.ObjectId;

export interface User extends Document {
  _id: ID;
  email: string;
  passwordHash: string;
  name: string;
  contactPhone?: string;
  role: 'client' | 'admin' | 'manager';
}

export interface SearchUserParams {
  limit: number;
  offset: number;
  email?: string;
  name?: string;
  contactPhone?: string;
}

export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
}
