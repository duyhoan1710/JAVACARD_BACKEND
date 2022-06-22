import { CreateTaxDto } from './../taxHistory/dtos/tax.dto';
import { TaxHistoryRepository } from './../taxHistory/repository/taxHistory.repository';
import { Injectable } from '@nestjs/common';

import { TaxRepository } from './tax.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class TaxService {
  constructor(
    private readonly taxRepository: TaxRepository,
    private readonly taxHistoryRepository: TaxHistoryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  create({ body, userId }: { body: CreateTaxDto; userId: number }) {
    this.taxRepository.save({
      ...body,
      userId,
    });

    this.taxHistoryRepository.save({
      ...body,
      userId: userId,
    });

    this.userRepository.update({ id: userId }, { debt: body.totalTax });
  }

  getList({ userId }) {
    this.taxRepository.find({
      userId,
    });
  }
}
