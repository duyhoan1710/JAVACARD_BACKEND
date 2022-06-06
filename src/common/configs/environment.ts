export const Environment = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE,
};
