import { USER_EXIST } from './../../constants/errorContext';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';
import { generateToken } from '@src/common/helpers/jwt.helper';
import { AUTH_FAILED } from '../../constants/errorContext';

import { RegisterRequestDto } from './dtos/auth.dto';
import * as crypto from 'crypto';
import {
  getAddressNumber,
  randomString,
} from '@src/common/helpers/utils.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async login({ signature, secretMessage }) {
    const users = await this.userRepository.find();

    for (const user of users) {
      const verifier = crypto.createVerify('sha1');
      verifier.update(secretMessage);
      const isVerified = verifier.verify(user.publicKey, signature, 'base64');

      if (isVerified) {
        const { accessToken } = generateToken(
          {
            userId: user.id,
          },
          this.configService,
        );

        return {
          publicKey: user.publicKey,
          accessToken,
        };
      }
    }

    throw new HttpException(
      {
        context: AUTH_FAILED,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async register({
    body,
    avatarImage,
    fingerPrintImage,
  }: {
    body: RegisterRequestDto;
    avatarImage: string;
    fingerPrintImage: string;
  }) {
    const user = await this.userRepository.findOne({
      cardId: body.cardId,
    });

    if (user) {
      throw new HttpException(
        {
          context: USER_EXIST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const addessId = getAddressNumber(body.original);

    if (!addessId) {
      throw new HttpException(
        {
          content: 'ORIGIN_NOT_FOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const last2NumberOfYear = new Date(body.birthday)
      .getFullYear()
      .toString()
      .slice(-2);

    let identificationId;

    while (true) {
      const randomText = randomString(6);

      identificationId = `${addessId}${body.sex}${last2NumberOfYear}${randomText}`;

      const user = await this.userRepository.findOne({ identificationId });

      if (!user) break;
    }

    await this.userRepository.save({
      ...body,
      avatarImage,
      fingerPrintImage,
      identificationId,
      autoPay:
        body.autoPay === 'true' ||
        body.autoPay === true ||
        body.autoPay === 1 ||
        body.autoPay === '1',
    });

    return { identificationId };
  }
}
