import { ENV_VAR_NAMES } from '@commons/enums/env';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { OtpService } from './otp.service';

@Injectable()
export class UserCodeService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private readonly otpService: OtpService,

    private readonly configService: ConfigService,
  ) {}

  async generateCode(email: string) {
    const otp = this.otpService.generateOtp();

    await this.cacheManager.set(`reset-password-code-${email}`, otp, {
      ttl: this.configService.get<number>(
        ENV_VAR_NAMES.RESET_PASSWORD_OTP_EXPIRE,
      ),
    });

    return otp;
  }

  async verifyCode(email: string, code: string) {
    const otp = await this.cacheManager.get<string>(
      `reset-password-code-${email}`,
    );

    if (!otp || otp !== code) {
      return false;
    }

    return true;
  }
}
