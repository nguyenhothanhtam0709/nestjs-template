import { dbRegister, registerConfigModule } from '@bootstrap';
import { AuthModule } from '@modules/auth/auth.module';
import { LoggerModule } from '@modules/logger/logger.module';
import { MailModule } from '@modules/mail/mail.module';
import { UserCodeModule } from '@modules/userCode/userCode.module';
import { UserModule } from '@modules/users/user.module';
import { Module, Logger, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    registerConfigModule(),
    dbRegister(),
    CacheModule.register({ isGlobal: true }),
    UserModule,
    AuthModule,
    LoggerModule,
    UserCodeModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
