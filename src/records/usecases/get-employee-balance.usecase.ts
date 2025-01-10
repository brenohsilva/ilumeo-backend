import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class GetEmployeeBalancesUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(employeeId: number, month?: number, year?: number) {
    const filter: any = { employeesId: employeeId };

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

    return {
      totalBalance: parseFloat(totalBalance.toFixed(2)),
      ...(month && year ? { month, year } : {}),
    };
  }
}
