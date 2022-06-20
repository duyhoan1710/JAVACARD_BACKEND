import { EGender } from './../../../common/enums/index';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class UpdateProfileUser {
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
  autoPay: any;
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
}

@Exclude()
export class PayBillDto {}
