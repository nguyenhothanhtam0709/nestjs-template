export const ENV_VAR_NAMES = {
  NODE_ENV: 'NODE_ENV',

  // server
  API_PORT: 'API_PORT',
  SERVER_PREFIX: 'SERVER_PREFIX',
  GLOBAL_PREFIX: 'GLOBAL_PREFIX',

  // db
  MONGO_URL: 'MONGO_URL',

  // logging
  ENABLE_FILE_LOGGER: 'ENABLE_FILE_LOGGER',

  // jwt
  JWT_SECRET: 'JWT_SECRET',
  ACCESS_TOKEN_EXPIRE_IN: 'ACCESS_TOKEN_EXPIRE_IN',

  // otp
  OTP_LENGTH: 'OTP_LENGTH',
  RESET_PASSWORD_OTP_EXPIRE: 'RESET_PASSWORD_OTP_EXPIRE',

  // Mail
  MAIL_HOST: 'MAIL_HOST',
  MAIL_PORT: 'MAIL_PORT',
  MAIL_USER: 'MAIL_USER',
  MAIL_PASSWORD: 'MAIL_PASSWORD',
  DEFAULT_MAIL_FROM: 'DEFAULT_MAIL_FROM',
};

export enum NODE_ENV_ENUM {
  DEV = 'dev',
  STAGING = 'staging',
  PROD = 'prod',
}
