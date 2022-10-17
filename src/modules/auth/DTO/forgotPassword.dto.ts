import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordRequestBodyDto {
  @ApiProperty({ required: true, type: String, format: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
