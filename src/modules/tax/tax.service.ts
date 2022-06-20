import { Injectable } from '@nestjs/common';

import { TaxRepository } from './tax.repository';

@Injectable()
export class TaxService {
  constructor(private readonly taxRepository: TaxRepository) {}

  create({ body, userId }) {
    this.taxRepository.save({
      ...body,
      userId,
    });
  }

  getList({ userId }) {
    this.taxRepository.find({
      userId,
    });
  }
}
