import { MONEY_NOT_ENOUGH } from './../../constants/errorContext';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';
import { removeNullProperty } from '@src/common/helpers/utils.helper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getProfile({ userId }) {
    return this.userRepository.findOne({
      where: {
        id: userId,
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
      ],
    });
  }

  updateProfile({
    userId,
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
      { id: userId },
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

  async recharge({ userId, amount }) {
    const user = await this.userRepository.findOne({ id: userId });

    this.userRepository.save({ ...user, amount: user.amount + amount });
  }

  async payBill({ userId }) {
    const user = await this.userRepository.findOne({ id: userId });

    if (user && user.amount < user.debt) {
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
  }
}
