import { Injectable } from '@nestjs/common';
import { RoleSeed } from './role.seed';
import { UserSeed } from './user.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly roleSeed: RoleSeed,
    private readonly userSeed: UserSeed,
  ) {}

  async seed() {
    await this.roleSeed.seed();
    await this.userSeed.seed();
  }
}
