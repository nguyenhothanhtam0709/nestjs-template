import { METADATA_KEY } from '@commons/enums/metadata';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    /// Check permissions
    const userPermissions = this.getUserPermissions(user);
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      METADATA_KEY.PERMISSIONS,
      [context.getHandler(), context.getClass()],
    );

    if (
      !!requiredRoles &&
      requiredRoles.some((permission) => !userPermissions.includes(permission))
    ) {
      throw new ForbiddenException();
    }

    return user;
  }

  getUserPermissions(user) {
    return user?.roles?.map((item) => item.permissions).flat();
  }
}
