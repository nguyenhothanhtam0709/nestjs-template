import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class EditUserRequestBodyDto {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  name: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  expTime: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  maxDevice: number;
}
