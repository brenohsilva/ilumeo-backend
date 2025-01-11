import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.prisma.employees.create({
      data: createEmployeeDto,
    });
  }

  async findOne(code: string) {
    return await this.prisma.employees.findUnique({
      where: {
        code,
      },
    });
  }

  async findOneWithRecords(employeeId: number) {
    return await this.prisma.employees.findFirst({
      where: {
        id: employeeId,
      },
      include: {
        registers: true,
      },
    });
  }

  async findRecordsByMonth(employeeId: number, month: number, year: number) {
    return await this.prisma.records.findMany({
      where: {
        employeesId: employeeId,
        month: month || 1,
        year: year,
      },
      orderBy: {
        day: 'asc',
      },
    });
  }
}
