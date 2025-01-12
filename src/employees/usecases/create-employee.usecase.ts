import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeesService } from '../employees.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
@Injectable()
export class CreateEmployeeUseCase {
  constructor(private readonly employeesService: EmployeesService) {}

  async execute(createEmployeeDto: CreateEmployeeDto) {
    try {
      const employee = await this.employeesService.create(createEmployeeDto);
      return employee;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao criar o funcionario. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
