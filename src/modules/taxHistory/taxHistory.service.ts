import { Injectable } from '@nestjs/common';
import { PaymentHistoryRepository } from './repository/paymentHistory.repository';
import { TaxHistoryRepository } from './repository/taxHistory.repository';

@Injectable()
export class TaxHistoryService {
  constructor(
    private readonly taxHistoryRepository: TaxHistoryRepository,
    private readonly paymentHistoryRepository: PaymentHistoryRepository,
  ) {}

  getListPaymentHistory({ userId }) {
    return this.paymentHistoryRepository.find({ userId });
  }

  getListTaxHistory({ userId }) {
    return this.taxHistoryRepository.find({ userId });
  }
}
