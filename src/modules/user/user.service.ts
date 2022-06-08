import {
  VERIFY_CODE_INCORRECT,
  MONEY_NOT_ENOUGH,
} from './../../constants/errorContext';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getProfile({ userId }) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      select: [
        'fullName',
        'gender',
        'image',
        'dateOfBirth',
        'country',
        'hometown',
        'address',
        'cardNumber',
        'amount',
        'debt',
      ],
    });
  }

  updateProfile({
    userId,
    fullName,
    dateOfBirth,
    gender,
    image,
    country,
    hometown,
    address,
  }) {
    this.userRepository.update(
      { id: userId },
      { fullName, gender, dateOfBirth, image, country, hometown, address },
    );
  }

  async updateVerifyCode({ userId, oldVerifyCode, newVerifyCode }) {
    const user = await this.userRepository.findOne({ id: userId });

    if (user && user.verifyCode !== oldVerifyCode) {
      throw new HttpException(
        {
          context: VERIFY_CODE_INCORRECT,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    this.userRepository.save({ ...user, verifyCode: newVerifyCode });
  }

  async recharge({ userId, verifyCode, amount }) {
    const user = await this.userRepository.findOne({ id: userId });

    if (user && user.verifyCode !== verifyCode) {
      throw new HttpException(
        {
          context: VERIFY_CODE_INCORRECT,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    this.userRepository.save({ ...user, amount: user.amount + amount });
  }

  async payBill({ userId, verifyCode }) {
    const user = await this.userRepository.findOne({ id: userId });

    if (user && user.verifyCode !== verifyCode) {
      throw new HttpException(
        {
          context: VERIFY_CODE_INCORRECT,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

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
