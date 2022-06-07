import { EGender } from './../../../common/enums/index';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { UserEntity } from '@src/entities/user.entity';

@Exclude()
export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  fullName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  constructor(data: Partial<UserResponseDto>) {
    Object.assign(this, data);
  }
}

@Exclude()
export class UserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  password: string;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}

@Exclude()
export class UpdateProfileUser {
  @ApiPropertyOptional()
  @IsString()
  @Expose()
  fullName: string;

  @ApiPropertyOptional()
  @IsDate()
  @Expose()
  dateOfBirth: Date;

  @ApiPropertyOptional({
    enum: EGender,
    default: EGender.FEMALE,
    examples: EGender,
  })
  gender: EGender;

  @ApiPropertyOptional()
  @IsString()
  image: string;

  @ApiPropertyOptional()
  @IsString()
  country: string;

  @ApiPropertyOptional()
  @IsString()
  hometown: string;

  @ApiPropertyOptional()
  @IsString()
  address: string;
}

@Exclude()
export class UpdateVerifyCodeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  oldVerifyCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  newVerifyCode: string;
}
