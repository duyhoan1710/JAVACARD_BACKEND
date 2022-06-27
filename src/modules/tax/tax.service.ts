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

  create({ body, identificationId }: { body: CreateTaxDto; identificationId }) {
    this.taxRepository.save({
      ...body,
      identificationId,
    });

    this.taxHistoryRepository.save({
      ...body,
      identificationId: identificationId,
    });

    this.userRepository.update({ identificationId }, { debt: body.totalTax });
  }

  getList({ identificationId }) {
    return this.taxRepository.find({
      identificationId,
    });
  }
}
