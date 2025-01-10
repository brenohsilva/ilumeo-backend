import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CreateRecordUseCase } from './usecases/create-record.usecase';

@Controller('records')
export class RecordsController {
  constructor(
    private readonly recordsService: RecordsService,
    private readonly createRecordUseCase: CreateRecordUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateRecordDto) {
    return this.createRecordUseCase.execute(dto);
  }

  @Get('today')
  async getTodayRegisters(@Query('employeeId') employeeId: string) {
    return this.recordsService.getTodayRecords(Number(employeeId));
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
