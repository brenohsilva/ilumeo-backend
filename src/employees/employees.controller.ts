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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { GetEmployeeRecordsUseCase } from './usecases/get-employee-records.usecase';
import { GetEmployeeBalancesUseCase } from 'src/records/usecases/get-employee-balance.usecase';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly getEmployeeRecordsUseCase: GetEmployeeRecordsUseCase,
    private readonly getEmployeeBalancesUseCase: GetEmployeeBalancesUseCase,
  ) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get(':id/records')
  async getRecordsByMonth(
    @Param('id') id: string,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return this.getEmployeeRecordsUseCase.execute(id, month, year);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id/balances')
  async getBalances(
    @Param('id') id: string,
    @Query('month') month?: number,
    @Query('year') year?: number,
  ) {
    return this.getEmployeeBalancesUseCase.execute(Number(id), month, year);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
