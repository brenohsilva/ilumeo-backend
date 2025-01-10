import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CreateRecordUseCase } from './usecases/create-record.usecase';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetTodaysRecordUseCase } from './usecases/get-todays-records.usecase';

@Controller('records')
export class RecordsController {
  constructor(
    private readonly recordsService: RecordsService,
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

  @Get()
  findAll() {
    return this.recordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(+id, updateRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(+id);
  }
}
