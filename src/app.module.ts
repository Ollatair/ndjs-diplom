import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';

const MONGO_URI = 'mongodb://localhost:27017/hotel-aggregator'

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), UsersModule],
})
export class AppModule {}
