import { ENV_VAR_NAMES } from '@commons/enums/env';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const createSmtpTransport = (
  configService: ConfigService,
): SMTPTransport | SMTPTransport.Options => {
  const host = configService.get<string>(ENV_VAR_NAMES.MAIL_HOST);
  const port = configService.get<number>(ENV_VAR_NAMES.MAIL_PORT);
  const mailerUser = configService.get<string>(ENV_VAR_NAMES.MAIL_USER);
  const mailerPass = configService.get<string>(ENV_VAR_NAMES.MAIL_PASSWORD);

  const transport: SMTPTransport | SMTPTransport.Options = {
    host,
    port,
    auth: {
      user: mailerUser,
      pass: mailerPass,
    },
  };

  return transport;
};
