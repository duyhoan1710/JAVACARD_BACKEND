import { UserRepository } from './../user/user.repository';
import { PaymentHistoryRepository } from './../taxHistory/repository/paymentHistory.repository';
import { TaxHistoryRepository } from './../taxHistory/repository/taxHistory.repository';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulingService {
  constructor(
    private readonly taxHistoryRepository: TaxHistoryRepository,
    private readonly paymentHistoryRepository: PaymentHistoryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    const users = await this.userRepository.find();

    const newUsers = [];
    const newPaymentHistory = [];

    for (const user of users) {
      const tax = await this.taxHistoryRepository
        .createQueryBuilder('tax')
        .where('tax.user_id = :userId', { userId: user.id })
        .orderBy('id', 'DESC')
        .getOne();

      if (!tax) continue;

      user.debt = user.debt + tax.totalTax;

      if (user.autoPay) {
        if (user.amount >= user.debt) {
          user.debt = 0;
          user.amount = user.amount - user.debt;
          newPaymentHistory.push({
            userId: user.id,
            totalTax: user.debt,
            status: true,
            message: 'Payment Success',
          });
        } else {
          newPaymentHistory.push({
            userId: user.id,
            totalTax: user.debt,
            status: false,
            message: 'Not Enough Money In Wallet',
          });
        }
      }

      newUsers.push(user);
    }

    this.userRepository.save(newUsers);
    this.paymentHistoryRepository.save(newPaymentHistory);
  }
}
