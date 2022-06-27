import { Injectable } from '@nestjs/common';
import { PaymentHistoryRepository } from './repository/paymentHistory.repository';
import { TaxHistoryRepository } from './repository/taxHistory.repository';

@Injectable()
export class TaxHistoryService {
  constructor(
    private readonly taxHistoryRepository: TaxHistoryRepository,
    private readonly paymentHistoryRepository: PaymentHistoryRepository,
  ) {}

  getListPaymentHistory({ identificationId }) {
    return this.paymentHistoryRepository.find({ identificationId });
  }

  getListTaxHistory({ identificationId }) {
    return this.taxHistoryRepository.find({ identificationId });
  }
}
