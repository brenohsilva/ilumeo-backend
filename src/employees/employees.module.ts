import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaService } from 'src/prisma.service';
import { GetEmployeeRecordsUseCase } from './usecases/get-employee-records.usecase';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, PrismaService, GetEmployeeRecordsUseCase],
})
export class EmployeesModule {}
