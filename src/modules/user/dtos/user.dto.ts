import { EGender } from './../../../common/enums/index';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

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
