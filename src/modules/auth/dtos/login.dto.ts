import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@Exclude()
export class LoginRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @Expose()
  password: string;
}
