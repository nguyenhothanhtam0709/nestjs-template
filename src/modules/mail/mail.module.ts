import { Module } from '@nestjs/common';
import { rootResolve } from '@commons/utils/path';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_VAR_NAMES } from '@commons/enums/env';
import { MailService } from './mail.service';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { createHotmailTransport } from './transports/hotmail';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const defaultFrom = configService.get<string>(
          ENV_VAR_NAMES.DEFAULT_MAIL_FROM,
        );

        const transport: SMTPTransport | SMTPTransport.Options =
          createHotmailTransport(configService);
        const templateDir = rootResolve('mails');

        const mailerConfig: MailerOptions = {
          transport,
          defaults: {
            from: defaultFrom,
          },
          template: {
            dir: templateDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };

        return mailerConfig;
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
