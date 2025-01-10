import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmployeesService } from 'src/employees/employees.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmployeesService, PrismaService],
})
export class AuthModule {}
