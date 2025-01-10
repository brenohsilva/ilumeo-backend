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
        balanceHours: 245.4,
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.records.update({
      where: { id },
      data,
    });
  }

  async getTodayRecords(employeeId: number) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return await this.prisma.records.findFirst({
      where: {
        employeesId: employeeId,
        day,
        month,
        year,
      },
    });
  }

  async findAll() {
    return `This action returns all records`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} record`;
  }

  async remove(id: number) {
    return `This action removes a #${id} record`;
  }
}
