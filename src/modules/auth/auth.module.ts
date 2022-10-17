import { ENV_VAR_NAMES } from '@commons/enums/env';
import { MailModule } from '@modules/mail/mail.module';
import { UserCodeModule } from '@modules/userCode/userCode.module';
import { UserModule } from '@modules/users/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtConfig: JwtModuleOptions = {
          secret: configService.get<string>(ENV_VAR_NAMES.JWT_SECRET),
          signOptions: {
            expiresIn: configService.get<string>(
              ENV_VAR_NAMES.ACCESS_TOKEN_EXPIRE_IN,
            ),
          },
        };

        return jwtConfig;
      },
    }),
    UserCodeModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}
