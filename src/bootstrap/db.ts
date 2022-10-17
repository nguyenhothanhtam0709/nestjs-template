import { ENV_VAR_NAMES } from '@commons/enums/env';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const dbRegister = () =>
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const mongoConfig: MongooseModuleFactoryOptions = {
        uri: configService.get<string>(ENV_VAR_NAMES.MONGO_URL),
        useNewUrlParser: true,
      };

      return mongoConfig;
    },
  });
