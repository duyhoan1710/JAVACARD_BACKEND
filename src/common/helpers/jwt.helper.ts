import jwt from 'jsonwebtoken';

import configs from 'common/configs';

export function generateToken(data: any): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = jwt.sign(data, configs.ENV.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: configs.ENV.ACCESS_TOKEN_EXPIRE,
  });

  const refreshToken = jwt.sign(data, configs.ENV.REFRESH_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: configs.ENV.REFRESH_TOKEN_EXPIRE,
  });

  return { accessToken, refreshToken };
}
