import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GetEmployeeBalancesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(req: any, month?: number, year?: number) {
    try {
      const employee = req.employee;
      const filter: any = { employeesId: employee.sub };

      if (month && year) {
        filter.month = Number(month);
        filter.year = Number(year);
      }

      const records = await this.prisma.records.findMany({
        where: filter,
        select: { balanceHours: true },
      });

      const totalBalance = records.reduce(
        (sum, record) => sum + record.balanceHours,
        0,
      );

      const totalMinutes = Math.round(totalBalance * 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.abs(totalMinutes % 60);

      return {
        totalBalance: parseFloat(totalBalance.toFixed(2)),
        formattedBalance: `${hours}h ${minutes.toString().padStart(2, '0')}m`,
        ...(month && year ? { month, year } : {}),
      };
    } catch (error) {
      console.error('Erro ao obter o saldo do funcionário:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Erro interno ao processar o saldo do funcionário. Tente novamente mais tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
