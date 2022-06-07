import { Injectable } from '@nestjs/common';

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

  updateProfile({ userId, fullName, image, dateOfBirth, gender }) {
    this.userRepository.update(
      { id: userId },
      { fullName, image, gender, dateOfBirth },
    );
  }

  async updateVerifyCode({ userId, oldVerifyCode, newVerifyCode }) {
    await this.userRepository.update(
      { id: userId, verifyCode: oldVerifyCode },
      { verifyCode: newVerifyCode },
    );
  }
}
