import {
  AUTH_FAILED,
  MONEY_NOT_ENOUGH,
  USER_NOT_EXIST,
} from './../../constants/errorContext';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';
import { removeNullProperty } from '@src/common/helpers/utils.helper';
import { PaymentHistoryRepository } from '../taxHistory/repository/paymentHistory.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly paymentHistoryRepository: PaymentHistoryRepository,
  ) {}

  async getProfile({ identificationId }) {
    const user = await this.userRepository.findOne({
      where: {
        identificationId,
      },
      select: [
        'id',
        'fullName',
        'sex',
        'avatarImage',
        'fingerPrintImage',
        'birthday',
        'national',
        'original',
        'address',
        'cardId',
        'amount',
        'debt',
        'personalIdentification',
        'expiredDate',
        'releaseDate',
        'autoPay',
        'identificationId',
      ],
    });

    if (!user) {
      throw new HttpException(
        {
          context: USER_NOT_EXIST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  updateProfile({
    identificationId,
    fullName,
    birthday,
    sex,
    avatarImage,
    fingerPrintImage,
    national,
    original,
    address,
    personalIdentification,
    autoPay,
  }) {
    this.userRepository.update(
      { identificationId },
      {
        ...removeNullProperty({
          fullName,
          birthday,
          sex,
          avatarImage,
          fingerPrintImage,
          national,
          original,
          address,
          personalIdentification,
          autoPay:
            autoPay === 'true' ||
            autoPay === true ||
            autoPay === 1 ||
            autoPay === '1',
        }),
      },
    );
  }

  async recharge({ identificationId, amount, signature }) {
    if (signature !== process.env.SIGNATURE) {
      throw new HttpException(
        {
          context: AUTH_FAILED,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne({ identificationId });

    if (!user) {
      return;
    }

    this.userRepository.save({ ...user, amount: user.amount + amount });
    this.paymentHistoryRepository.save({
      identificationId: identificationId,
      totalTax: amount,
      status: true,
      message: 'Recharge Success',
    });
  }

  async payBill({ identificationId }) {
    const user = await this.userRepository.findOne({ identificationId });

    if (user && user.amount < user.debt) {
      this.paymentHistoryRepository.save({
        identificationId: identificationId,
        totalTax: user.debt,
        status: false,
        message: 'Not Enough Money In Wallet',
      });

      throw new HttpException(
        {
          context: MONEY_NOT_ENOUGH,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.save({
      ...user,
      amount: user.amount - user.debt,
      debt: 0,
    });

    await this.paymentHistoryRepository.save({
      identificationId: identificationId,
      totalTax: user.debt,
      status: true,
      message: 'Payment Success',
    });
  }
}
