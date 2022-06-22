import { TaxRepository } from './../tax/tax.repository';
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
    private readonly taxRepository: TaxRepository,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const users = await this.userRepository.find();

    const newUsers = [];
    const newPaymentHistory = [];

    for (const user of users) {
      const tax = await this.taxRepository
        .createQueryBuilder('tax')
        .where('tax.user_id = :userId', { userId: user.id })
        .orderBy('id', 'DESC')
        .getOne();

      if (!tax) continue;

      await this.taxHistoryRepository.save({
        userId: user.id,
        personalIncome: tax.personalIncome,
        deduction: tax.deduction,
        insuranceDeduction: tax.insuranceDeduction,
        totalTax: tax.totalTax,
      });

      user.debt = user.debt + tax.totalTax;

      if (user.autoPay && user.debt) {
        if (user.amount >= user.debt) {
          newPaymentHistory.push({
            userId: user.id,
            totalTax: user.debt,
            status: true,
            message: 'Payment Success',
          });

          user.amount = user.amount - user.debt;
          user.debt = 0;
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
