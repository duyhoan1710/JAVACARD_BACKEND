import {
  USER_NOT_EXIST,
  VERIFY_CODE_INCORRECT,
  MONEY_NOT_ENOUGH,
} from './../../constants/errorContext';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FILE_NOT_EXIST } from '@src/constants/errorContext';

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

  updateVerifyCode({ userId, oldVerifyCode, newVerifyCode }) {
    this.userRepository.update(
      { id: userId, verifyCode: oldVerifyCode },
      { verifyCode: newVerifyCode },
    );
  }

  recharge({ userId, verifyCode, amount }) {
    this.userRepository.update({ id: userId, verifyCode }, { amount });
  }

  async payBill({ userId, verifyCode }) {
    const user = await this.userRepository.findOne({ id: userId, verifyCode });

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
