import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import configs from 'common/configs';

import { ErrorCode } from 'enums/errorCode.enum';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    if (accessToken) {
      try {
        const decoded = jwt.verify(
          accessToken,
          configs.ENV.ACCESS_TOKEN_SECRET,
        );
        req.userId = decoded.userId;

        next();
      } catch {
        throw new UnauthorizedException(ErrorCode.TOKEN_EXPIRED);
      }
    } else {
      throw new UnauthorizedException(ErrorCode.ACCESS_DENIED);
    }
  }
}
