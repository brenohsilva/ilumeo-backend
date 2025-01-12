import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { GetEmployeeRecordsUseCase } from './usecases/get-employee-records.usecase';
import { GetEmployeeBalancesUseCase } from 'src/records/usecases/get-employee-balance.usecase';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateEmployeeUseCase } from './usecases/create-employee.usecase';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly getEmployeeRecordsUseCase: GetEmployeeRecordsUseCase,
    private readonly getEmployeeBalancesUseCase: GetEmployeeBalancesUseCase,
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
  ) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.createEmployeeUseCase.execute(createEmployeeDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.employee;
  }

  @UseGuards(AuthGuard)
  @Get('records')
  async getRecordsByMonth(
    @Request() req,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return this.getEmployeeRecordsUseCase.execute(req, month, year);
  }

  @UseGuards(AuthGuard)
  @Get('balances')
  async getBalances(
    @Request() req,
    @Query('month') month?: number,
    @Query('year') year?: number,
  ) {
    return this.getEmployeeBalancesUseCase.execute(req, month, year);
  }
}
