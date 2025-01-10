import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RecordsService } from '../records.service';

@Injectable()
export class GetTodaysRecordUseCase {
  constructor(private readonly recordService: RecordsService) {}
  async execute(req: any) {
    const employee = req.employee;
    try {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const response = await this.recordService.getTodayRecords(
        Number(employee.sub),
        day,
        month,
        year,
      );

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao buscar os registros. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
