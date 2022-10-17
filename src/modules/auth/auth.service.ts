import { ERROR_MESSAGE } from '@commons/enums/errorMessage';
import { comparePassword } from '@commons/utils/password';
import { MailService } from '@modules/mail/mail.service';
import { UserCodeService } from '@modules/userCode/userCode.service';
import { UserDocument } from '@modules/users/models/user.entity';
import { UserService } from '@modules/users/user.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordRequestBodyDto } from './DTO/forgotPassword.dto';
import { ResetPasswordRequestBodyDto } from './DTO/resetPassword.dto';
import { SignupRequestBodyDto } from './DTO/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly userCodeService: UserCodeService,
    private readonly mailService: MailService,
  ) {}

  async signup(data: SignupRequestBodyDto) {
    const isExist = await this.userService.findByEmail(data.email);
    if (isExist) {
      throw new BadRequestException(
        ERROR_MESSAGE.ALREADY_EXIST.replace('{0}', 'email'),
      );
    }

    const user = await this.userService.createUser(data);
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await comparePassword(password, user.password))) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { sub: user.id };
    return {
      ...user.toJSON(),
      token: { access_token: this.jwtService.sign(payload) },
    };
  }

  async forgotPassword(data: ForgotPasswordRequestBodyDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException(
        ERROR_MESSAGE.NOT_EXIST.replace('{0}', `Email ${data.email}`),
      );
    }

    /**
     * generate code
     */
    const code = await this.userCodeService.generateCode(data.email);

    /**
     * send email
     */
    this.mailService.sendEmailOtp(data.email, {
      name: user.name,
      code,
      expire_time: 5,
    });

    return {
      code,
    };
  }

  async resetPassword(data: ResetPasswordRequestBodyDto) {
    const { email, code, newPassword } = data;

    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException(
        ERROR_MESSAGE.NOT_EXIST.replace('{0}', `Email ${data.email}`),
      );
    }

    /**
     * verify reset password code
     */
    const isValid = await this.userCodeService.verifyCode(email, code);
    if (!isValid) {
      throw new ForbiddenException('Code is invalid');
    }

    /**
     * reset password
     */
    await this.userService.resetPassword(user.id, newPassword);

    return true;
  }
}
