import { UserRepository } from './../user/user.repository';
import { TaxHistoryRepository } from './../taxHistory/repository/taxHistory.repository';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';

import { TaxRepository } from './tax.repository';

const repositories = [TaxRepository, TaxHistoryRepository, UserRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories), ConfigModule],
  controllers: [TaxController],
  providers: [TaxService],
})
export class TaxModule {}
