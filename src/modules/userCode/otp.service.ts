import { DEFAULT_OTP_LENGTH } from '@commons/const/env';
import { ENV_VAR_NAMES } from '@commons/enums/env';
import { OtpOptions } from '@commons/interface/otp';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as otpGeneration from 'otp-generator';

@Injectable()
export class OtpService {
  private readonly otpConfig: OtpOptions;
  private readonly otpLength: number;

  constructor(private readonly configService: ConfigService) {
    this.otpConfig = { upperCaseAlphabets: false, specialChars: false };
    this.otpLength =
      this.configService.get<number>(ENV_VAR_NAMES.OTP_LENGTH) ||
      DEFAULT_OTP_LENGTH;
  }

  generateOtp(length = this.otpLength) {
    return otpGeneration.generate(length, this.otpConfig);
  }
}
