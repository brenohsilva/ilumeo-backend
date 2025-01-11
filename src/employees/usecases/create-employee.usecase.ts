import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeesService } from '../employees.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Prisma } from '@prisma/client';
@Injectable()
export class CreateEmployeeUseCase {
  constructor(private readonly employeesService: EmployeesService) {}

  async execute(createEmployeeDto: CreateEmployeeDto) {
    try {
      const employee = await this.employeesService.create(createEmployeeDto);
      return employee;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'Já existe um funcionário com esses dados.',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException(
        'Erro ao criar o funcionario. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
