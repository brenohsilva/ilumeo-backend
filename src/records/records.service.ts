import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecordsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRecordDto: CreateRecordDto) {
    return await this.prisma.records.create({
      data: {
        employeesId: createRecordDto.employeesId,
        day: createRecordDto.day,
        month: createRecordDto.month,
        year: createRecordDto.year,
        entry: createRecordDto.record,
        balanceHours: 0,
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.records.update({
      where: { id },
      data,
    });
  }

  async getTodayRecords(employeeId: number, day, month, year) {
    return await this.prisma.records.findFirst({
      where: {
        employeesId: employeeId,
        day,
        month,
        year,
      },
    });
  }
}
