import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [EmployeesModule, RecordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
