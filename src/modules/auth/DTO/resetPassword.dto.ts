import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordRequestBodyDto {
  @ApiProperty({ required: true, type: String, format: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  newPassword: string;
}
