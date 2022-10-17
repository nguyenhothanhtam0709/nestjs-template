import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class SignupRequestBodyDto {
  @ApiProperty({ required: true, type: String, format: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  password: string;
}
