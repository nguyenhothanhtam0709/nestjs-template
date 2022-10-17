import { ENV_VAR_NAMES } from '@commons/enums/env';
import { IJwtPayload } from '@commons/interface/jwtPayload';
import { UserService } from '@modules/users/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ENV_VAR_NAMES.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { sub: userId } = payload;

    const user = await this.userService.findByIdWithRoles(userId);
    if (user) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
