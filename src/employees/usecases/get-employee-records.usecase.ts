import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeesService } from '../employees.service';

@Injectable()
export class GetEmployeeRecordsUseCase {
  constructor(private readonly employeesService: EmployeesService) {}

  async execute(req: any, month: number, year: number) {
    try {
      const employee = req.employee;
      return await this.employeesService.findRecordsByMonth(
        Number(employee.sub),
        Number(month),
        Number(year),
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao buscar os registros. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
