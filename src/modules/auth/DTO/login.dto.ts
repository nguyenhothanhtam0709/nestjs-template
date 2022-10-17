import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestBodyDto {
  @ApiProperty({ required: true, type: String, format: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  @ApiResponseProperty({ type: String })
  accessToken: string;
}
