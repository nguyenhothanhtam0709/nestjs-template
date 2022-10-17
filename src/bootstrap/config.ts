import {
  DEFAULT_GLOBAL_PREFIX,
  DEFAULT_API_PORT,
  DEFAULT_OTP_LENGTH,
  DEFAULT_RESET_PASSWORD_OTP_EXPIRE,
} from '@commons/const/env';
import { BOOLEAN_STRING } from '@commons/enums/boolean';
import { ENV_VAR_NAMES, NODE_ENV_ENUM } from '@commons/enums/env';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

export const registerConfigModule = () =>
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: joi.object({
      [ENV_VAR_NAMES.NODE_ENV]: joi
        .string()
        .valid(NODE_ENV_ENUM.DEV, NODE_ENV_ENUM.STAGING, NODE_ENV_ENUM.PROD)
        .default(NODE_ENV_ENUM.DEV),
      [ENV_VAR_NAMES.API_PORT]: joi.number().default(DEFAULT_API_PORT),
      [ENV_VAR_NAMES.MONGO_URL]: joi.string().required(),
      [ENV_VAR_NAMES.ENABLE_FILE_LOGGER]: joi
        .string()
        .valid(BOOLEAN_STRING.TRUE, BOOLEAN_STRING.FALSE)
        .default(BOOLEAN_STRING.FALSE),
      [ENV_VAR_NAMES.SERVER_PREFIX]: joi.string().optional(),
      [ENV_VAR_NAMES.GLOBAL_PREFIX]: joi
        .string()
        .default(DEFAULT_GLOBAL_PREFIX),
      [ENV_VAR_NAMES.JWT_SECRET]: joi.string().required(),
      [ENV_VAR_NAMES.ACCESS_TOKEN_EXPIRE_IN]: joi.string().required(),
      [ENV_VAR_NAMES.OTP_LENGTH]: joi.number().default(DEFAULT_OTP_LENGTH),
      [ENV_VAR_NAMES.RESET_PASSWORD_OTP_EXPIRE]: joi
        .number()
        .default(DEFAULT_RESET_PASSWORD_OTP_EXPIRE),
      [ENV_VAR_NAMES.MAIL_HOST]: joi.string(),
      [ENV_VAR_NAMES.MAIL_PORT]: joi.number(),
      [ENV_VAR_NAMES.MAIL_USER]: joi.string(),
      [ENV_VAR_NAMES.MAIL_PASSWORD]: joi.string(),
      [ENV_VAR_NAMES.DEFAULT_MAIL_FROM]: joi.string(),
    }),
  });
