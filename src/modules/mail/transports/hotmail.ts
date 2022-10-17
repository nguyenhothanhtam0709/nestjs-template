import { ENV_VAR_NAMES } from '@commons/enums/env';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

/**
 * Outlook
 */
export const createHotmailTransport = (
  configService: ConfigService,
): SMTPTransport | SMTPTransport.Options => {
  const mailerUser = configService.get<string>(ENV_VAR_NAMES.MAIL_USER);
  const mailerPass = configService.get<string>(ENV_VAR_NAMES.MAIL_PASSWORD);

  const transport: SMTPTransport | SMTPTransport.Options = {
    service: 'hotmail',
    auth: {
      user: mailerUser,
      pass: mailerPass,
    },
  };

  return transport;
};
