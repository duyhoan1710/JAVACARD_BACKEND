import { EGender } from './../../../common/enums/index';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  country: string;

  @ApiPropertyOptional()
  @IsString()
  hometown: string;

  @ApiPropertyOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @IsString()
  image: string;

  @ApiPropertyOptional()
  @IsNumber()
  personalIncome: number;
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

@Exclude()
export class RechargeDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  verifyCode: number;
}

@Exclude()
export class PayBillDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  verifyCode: number;
}
