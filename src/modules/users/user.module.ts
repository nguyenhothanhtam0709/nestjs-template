import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './models/role.entity';
import { User, UserSchema } from './models/user.entity';
import { RoleSeed } from './seed/role.seed';
import { SeedService } from './seed/seed.service';
import { UserSeed } from './seed/user.seed';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RoleSeed, UserSeed, SeedService],
  exports: [UserService],
})
export class UserModule implements OnApplicationBootstrap {
  constructor(private readonly seedService: SeedService) {}

  onApplicationBootstrap() {
    this.seedService.seed();
  }
}
