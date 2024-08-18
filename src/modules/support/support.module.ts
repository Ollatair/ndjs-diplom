import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportService } from './services/support.service';
import { SupportController } from './controllers/support.controller';
import { SupportRequestSchema } from './schemas/support.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SupportRequest', schema: SupportRequestSchema }]),
  ],
  providers: [SupportService],
  controllers: [SupportController],
  exports: [SupportService],
})
export class SupportModule {}
