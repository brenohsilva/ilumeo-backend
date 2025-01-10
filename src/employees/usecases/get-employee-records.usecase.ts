import { Injectable } from '@nestjs/common';
import { EmployeesService } from '../employees.service';

@Injectable()
export class GetEmployeeRecordsUseCase {
  constructor(private readonly employeesService: EmployeesService) {}

  async execute(employeeId: string){
    return await this.employeesService.findOne(Number(employeeId))
  }
}
