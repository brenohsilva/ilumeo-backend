import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { PrismaService } from 'src/prisma.service';
import { CreateRecordUseCase } from './usecases/create-record.usecase';
import { GetTodaysRecordUseCase } from './usecases/get-todays-records.usecase';

@Module({
  controllers: [RecordsController],
  providers: [
    RecordsService,
    PrismaService,
    CreateRecordUseCase,
    GetTodaysRecordUseCase,
  ],
})
export class RecordsModule {}
