import { ApiProperty } from '@nestjs/swagger';
import { ToBoolean } from '@src/common/decorators';
import { EGender } from '@src/common/enums';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

// Login
@Exclude()
export class LoginRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  signature: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  secretMessage: string;
}

@Exclude()
export class LoginResponseDto {}

// Register
@Exclude()
export class RegisterRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  cardId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  birthday: string;

  @ApiProperty({
    enum: EGender,
    default: EGender.FEMALE,
    examples: EGender,
  })
  sex: EGender;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  national: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  original: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  personalIdentification: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  publicKey: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  releaseDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  expiredDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  autoPay: any;
}

@Exclude()
export class registerResponseDto {}
