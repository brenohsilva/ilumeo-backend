import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async signIn(code: string): Promise<any> {
    const employee = await this.employeeService.findOne(code);
    console.log(employee);
    if (!employee) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: employee.id,
      username: employee.name,
      code: employee.code,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
