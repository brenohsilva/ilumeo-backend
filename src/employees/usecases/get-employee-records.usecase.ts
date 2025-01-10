import { Injectable } from '@nestjs/common';
import { EmployeesService } from '../employees.service';

@Injectable()
export class GetEmployeeRecordsUseCase {
  constructor(private readonly employeesService: EmployeesService) {}

  async execute(employeeId: string, month: number, year: number) {
    return await this.employeesService.findRecordsByMonth(
      Number(employeeId),
      Number(month),
      Number(year),
    );
  }
}
