import { ENV_VAR_NAMES } from '@commons/enums/env';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordEmailDto } from './DTO/resetPasswordEmail.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  private async sendMail(options: ISendMailOptions) {
    try {
      const result = await this.mailer.sendMail(options);
      this.logger.log('send result', result);
    } catch (error) {
      this.logger.error(error);
    }
  }

  sendEmailOtp(to: string, data: ResetPasswordEmailDto) {
    return this.sendMail({
      from: this.configService.get<string>(ENV_VAR_NAMES.DEFAULT_MAIL_FROM),
      to: [to],
      template: 'reset-password-email',
      subject: 'Reset Password Code',
      context: data,
    });
  }
}
