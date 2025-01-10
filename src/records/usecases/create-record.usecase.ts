import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRecordDto } from '../dto/create-record.dto';
import { RecordsService } from '../records.service';

@Injectable()
export class CreateRecordUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly recordService: RecordsService,
  ) {}

  async execute(data: CreateRecordDto) {
    const { employeesId, day, month, year, record } = data;
    console.log(day)
    const existingRecord = await this.prisma.records.findFirst({
      where: { employeesId: employeesId, day, month, year },
    });

    if (!existingRecord) {
      return await this.recordService.create(data);
    }

    const updatedFields = this.getNextAvailableField(existingRecord, record);

    return await this.recordService.update(existingRecord.id, updatedFields);
  }

  private getNextAvailableField(register: any, timeStamp: Date) {
    if (!register.entry) return { entry: timeStamp };
    if (!register.lunchStart) return { lunchStart: timeStamp };
    if (!register.lunchEnd) return { lunchEnd: timeStamp };
    if (!register.exit) return { exit: timeStamp };

    throw new Error('Todos Os registros foram computados para esse dia!');
  }
}
