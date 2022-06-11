import { USER_EXIST } from './../../constants/errorContext';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';
import { generateToken } from '@src/common/helpers/jwt.helper';
import { AUTH_FAILED } from '../../constants/errorContext';
import { randomString } from '@src/common/helpers/utils.helper';

import * as crypto from 'crypto';
import * as fs from 'fs';
import { decryptText, encryptText } from '@src/common/helpers/crypto.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async login({ cardNumber, verifyCode }) {
    const user = await this.userRepository.findOne({ cardNumber });

    if (user && decryptText(user.verifyCode).toString() === verifyCode) {
      const { accessToken } = generateToken(
        {
          userId: user.id,
        },
        this.configService,
      );

      return { accessToken };
    }

    throw new HttpException(
      {
        context: AUTH_FAILED,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async register({ cardNumber }) {
    const user = await this.userRepository.findOne({
      cardNumber,
    });

    if (user) {
      throw new HttpException(
        {
          context: USER_EXIST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const verifyCode = randomString(6);
    const encryptedData = encryptText(verifyCode);

    await this.userRepository.save({
      cardNumber,
      verifyCode: encryptedData.toString('base64'),
      amount: 0,
      debt: 0,
    });

    return {
      cardNumber,
      verifyCode,
    };
  }
}
