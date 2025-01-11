import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaService } from 'src/prisma.service';
import { GetEmployeeRecordsUseCase } from './usecases/get-employee-records.usecase';
import { GetEmployeeBalancesUseCase } from 'src/records/usecases/get-employee-balance.usecase';
import { CreateEmployeeUseCase } from './usecases/create-employee.usecase';

@Module({
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    PrismaService,
    GetEmployeeRecordsUseCase,
    GetEmployeeBalancesUseCase,
    CreateEmployeeUseCase,
  ],
})
export class EmployeesModule {}
