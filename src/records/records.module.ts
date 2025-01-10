import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { PrismaService } from 'src/prisma.service';
import { CreateRecordUseCase } from './usecases/create-record.usecase';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService, PrismaService, CreateRecordUseCase],
})
export class RecordsModule {}
