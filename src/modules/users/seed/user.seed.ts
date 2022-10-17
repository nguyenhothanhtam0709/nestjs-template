import { USER_ROLE } from '@commons/enums/role';
import { hashPassword } from '@commons/utils/password';
import { getCurentTimestamp } from '@commons/utils/time';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.entity';

@Injectable()
export class UserSeed {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    private readonly logger: Logger,
  ) {}

  async seed(): Promise<void> {
    try {
      const isSeed = await this.userModel.findOne();
      if (isSeed) {
        return;
      }
      this.logger.log('Start seed user collection');
      const seedData = [
        {
          email: 'admin@gmail.com',
          name: 'Admin',
          password: await hashPassword('admin'),
          roles: [USER_ROLE.ADMIN.id, USER_ROLE.USER.id],
          createdAt: getCurentTimestamp(),
        },
      ];
      await this.userModel.insertMany(seedData);
      this.logger.log('End seed user collection');
    } catch (error) {
      this.logger.error(`Error when seed user collection`, error);
    }
  }
}
