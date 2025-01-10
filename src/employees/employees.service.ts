import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.prisma.employees.create({
      data: createEmployeeDto,
    });
  }

  async findAll() {
    return `This action returns a employee`;
  }

  async findOne(employeeId: number) {
    console.log(employeeId);
    return await this.prisma.employees.findFirst({
      where: {
        id: 1,
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

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
