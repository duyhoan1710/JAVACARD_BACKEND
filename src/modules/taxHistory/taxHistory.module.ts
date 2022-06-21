import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TaxHistoryService } from './taxHistory.service';
import { PaymentHistoryRepository } from './repository/paymentHistory.repository';
import { TaxHistoryRepository } from './repository/taxHistory.repository';


const repositories = [TaxHistoryRepository, PaymentHistoryRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories), ConfigModule],
  providers: [TaxHistoryService],
})
export class TaxModule {}
