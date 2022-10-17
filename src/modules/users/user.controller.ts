import { CurrentUser } from '@commons/decorator/currentUser';
import { RequirePermissions } from '@commons/decorator/require-permissions.decorator';
import { PERMISSION_KEYS } from '@commons/enums/permission';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChangePasswordRequestBodyDto } from './DTO/changePassword.dto';
import { EditUserRequestBodyDto } from './DTO/editUser.dto';
import { QueryUserRequestQueryDto } from './DTO/queryUser.dto';
import { UserDocument } from './models/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('change-password')
  changePassword(
    @CurrentUser() user: UserDocument,
    @Body() body: ChangePasswordRequestBodyDto,
  ) {
    return this.userService.changePassword(user, body);
  }

  @Get(':id')
  @RequirePermissions(PERMISSION_KEYS.USER.EDIT_USER)
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Get()
  @RequirePermissions(PERMISSION_KEYS.USER.EDIT_USER)
  queryUser(@Query() query: QueryUserRequestQueryDto) {
    return this.userService.queryUser(query);
  }

  @Put(':id')
  @RequirePermissions(PERMISSION_KEYS.USER.EDIT_USER)
  editUser(@Param('id') id: string, @Body() data: EditUserRequestBodyDto) {
    return this.userService.editUser(id, data);
  }

  @Delete(':id')
  @RequirePermissions(PERMISSION_KEYS.USER.DELETE_USER)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
