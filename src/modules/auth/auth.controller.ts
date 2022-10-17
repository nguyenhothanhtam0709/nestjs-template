import { UserDocument } from '@modules/users/models/user.entity';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ForgotPasswordRequestBodyDto } from './DTO/forgotPassword.dto';
import { LoginRequestBodyDto } from './DTO/login.dto';
import { ResetPasswordRequestBodyDto } from './DTO/resetPassword.dto';
import { SignupRequestBodyDto } from './DTO/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Signup',
    description: 'User signup',
  })
  signup(@Body() body: SignupRequestBodyDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login',
    description: 'User login',
  })
  login(@Body() body: LoginRequestBodyDto, @Req() req: Request) {
    return this.authService.login(req.user as UserDocument);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordRequestBodyDto) {
    return this.authService.forgotPassword(body);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordRequestBodyDto) {
    return this.authService.resetPassword(body);
  }
}
