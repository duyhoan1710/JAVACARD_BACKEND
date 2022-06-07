import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

// Login
@Exclude()
export class LoginRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  cardNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  verifyCode: string;
}

@Exclude()
export class LoginResponseDto {}

// Register
@Exclude()
export class RegisterRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  cardNumber: string;
}

@Exclude()
export class registerResponseDto {}
