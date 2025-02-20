import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateRecordDto } from './dto/create-record.dto';

import { CreateRecordUseCase } from './usecases/create-record.usecase';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetTodaysRecordUseCase } from './usecases/get-todays-records.usecase';

@Controller('records')
export class RecordsController {
  constructor(
    private readonly createRecordUseCase: CreateRecordUseCase,
    private readonly getTodaysRecordUseCase: GetTodaysRecordUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateRecordDto, @Request() req) {
    return this.createRecordUseCase.execute(req, dto);
  }

  @UseGuards(AuthGuard)
  @Get('today')
  async getTodayRegisters(@Request() req) {
    return this.getTodaysRecordUseCase.execute(req);
  }
}
