import { ENV_VAR_NAMES } from '@commons/enums/env';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

export const jwtRegister = () =>
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
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
  });
