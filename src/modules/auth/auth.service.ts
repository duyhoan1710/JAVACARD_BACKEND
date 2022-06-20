import { USER_EXIST } from './../../constants/errorContext';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';
import { generateToken } from '@src/common/helpers/jwt.helper';
import { AUTH_FAILED } from '../../constants/errorContext';

import { RegisterRequestDto } from './dtos/auth.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async login({ signature, secretMessage }) {
    const users = await this.userRepository.find();

    for (const user of users) {
      const isVerified = crypto.verify(
        'sha256',
        Buffer.from(secretMessage),
        {
          key: user.publicKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        },
        signature,
      );

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

    await this.userRepository.save({
      ...body,
      avatarImage,
      fingerPrintImage,
      autoPay:
        body.autoPay === 'true' ||
        body.autoPay === true ||
        body.autoPay === 1 ||
        body.autoPay === '1',
    });
  }
}
