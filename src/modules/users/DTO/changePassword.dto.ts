import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangePasswordRequestBodyDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  newPassword: string;
}
