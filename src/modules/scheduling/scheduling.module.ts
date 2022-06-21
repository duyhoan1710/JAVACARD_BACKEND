import { UserRepository } from './../user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentHistoryRepository } from './../taxHistory/repository/paymentHistory.repository';
import { TaxHistoryRepository } from './../taxHistory/repository/taxHistory.repository';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulingService } from './scheduling.service';

const repository = [
  TaxHistoryRepository,
  PaymentHistoryRepository,
  UserRepository,
];

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature(repository)],
  providers: [SchedulingService],
})
export class SchedulingModule {}
