import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRecordDto } from '../dto/create-record.dto';
import { RecordsService } from '../records.service';
import { getNextAvailableField } from '../utils/get-next-available-field';

@Injectable()
export class CreateRecordUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly recordService: RecordsService,
  ) {}

  async execute(req: any, data: CreateRecordDto) {
    try {
      const employee = req.employee;
      const date = new Date(data.record);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const dataRecord: CreateRecordDto = {
        day,
        month,
        year,
        employeesId: employee.sub,
        record: date,
      };

      const existingRecord = await this.prisma.records.findFirst({
        where: { employeesId: Number(employee.sub), day, month, year },
      });

      if (!existingRecord) {
        return await this.recordService.create(dataRecord);
      }

      const updatedFields = getNextAvailableField(existingRecord, data.record);

      return await this.recordService.update(existingRecord.id, updatedFields);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao criar o registro. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
