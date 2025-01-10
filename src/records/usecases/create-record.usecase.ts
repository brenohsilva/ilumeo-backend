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
    const existingRecord = await this.prisma.records.findFirst({
      where: { employeesId: employeesId, day, month, year },
    });

    if (!existingRecord) {
      return await this.recordService.create(data);
    }

    const updatedFields = this.getNextAvailableField(existingRecord, record);

    return await this.recordService.update(existingRecord.id, updatedFields);
  }

  private getNextAvailableField(register: any, record: Date) {
    const updatedFields: any = {};

    if (!register.entry) {
      updatedFields.entry = record;
      return updatedFields;
    }

    if (!register.lunchStart) {
      updatedFields.lunchStart = record;

      updatedFields.workedHours = this.calculateWorkedHours({
        entry: register.entry,
        lunchStart: record,
      });

      return updatedFields;
    }

    if (!register.lunchEnd) {
      updatedFields.lunchEnd = record;
      return updatedFields;
    }

    if (!register.exit) {
      updatedFields.exit = record;

      updatedFields.workedHours = this.calculateWorkedHours({
        entry: register.entry,
        lunchStart: register.lunchStart,
        lunchEnd: register.lunchEnd,
        exit: record,
      });

      updatedFields.balanceHours = (
        updatedFields.workedHours - (register.expectedHours || 8)
      ).toFixed(2);

      return updatedFields;
    }

    throw new Error('Todos os registros foram computados para esse dia!');
  }

  private calculateWorkedHours({
    entry,
    lunchStart,
    lunchEnd,
    exit,
  }: {
    entry?: Date | string;
    lunchStart?: Date | string;
    lunchEnd?: Date | string;
    exit?: Date | string;
  }): number {
    let workedHours = 0;

    if (entry && lunchStart) {
      const entryDate = new Date(entry);
      const lunchStartDate = new Date(lunchStart);
      workedHours +=
        (lunchStartDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60);
    }

    if (lunchEnd && exit) {
      const lunchEndDate = new Date(lunchEnd);
      const exitDate = new Date(exit);
      workedHours +=
        (exitDate.getTime() - lunchEndDate.getTime()) / (1000 * 60 * 60);
    }

    return parseFloat(workedHours.toFixed(2));
  }
}
