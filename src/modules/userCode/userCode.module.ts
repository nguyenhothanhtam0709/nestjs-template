import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { UserCodeService } from './userCode.service';

@Module({
  providers: [UserCodeService, OtpService],
  exports: [UserCodeService],
})
export class UserCodeModule {}
