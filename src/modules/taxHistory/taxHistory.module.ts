import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TaxHistoryService } from './taxHistory.service';
import { PaymentHistoryRepository } from './repository/paymentHistory.repository';
import { TaxHistoryRepository } from './repository/taxHistory.repository';
import { PaymentController } from './payment.controller';

const repositories = [TaxHistoryRepository, PaymentHistoryRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories), ConfigModule],
  controllers: [PaymentController],
  providers: [TaxHistoryService],
})
export class TaxHistoryModule {}
