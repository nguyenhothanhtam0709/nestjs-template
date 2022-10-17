import { PERMISSION_KEYS } from '@commons/enums/permission';
import { USER_ROLE } from '@commons/enums/role';
import { getCurentTimestamp } from '@commons/utils/time';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../models/role.entity';

const permissionArr = Object.values(PERMISSION_KEYS)
  .map((i) => Object.values(i))
  .flat(2);

const seedData = [
  {
    _id: USER_ROLE.ADMIN.id,
    name: USER_ROLE.ADMIN.name,
    slug: USER_ROLE.ADMIN.slug,
    permissions: permissionArr,
    isStatic: true,
    createdAt: getCurentTimestamp(),
  },
  {
    _id: USER_ROLE.USER.id,
    name: USER_ROLE.USER.name,
    slug: USER_ROLE.USER.slug,
    permissions: [],
    isStatic: false,
    createdAt: getCurentTimestamp(),
  },
];

@Injectable()
export class RoleSeed {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<RoleDocument>,

    private readonly logger: Logger,
  ) {}

  async seed(): Promise<void> {
    try {
      const isSeed = await this.roleModel.findOne();
      if (isSeed) {
        return;
      }
      this.logger.log('Start seed role collection');
      await this.roleModel.insertMany(seedData);
      this.logger.log('End seed role collection');
    } catch (error) {
      this.logger.error(`Error when seed role collection`, error);
    }
  }
}
