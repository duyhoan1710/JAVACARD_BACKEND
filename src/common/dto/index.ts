import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QueryUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identificationId: string;
}
