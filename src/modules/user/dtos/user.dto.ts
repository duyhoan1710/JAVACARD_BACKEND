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
  @IsString()
  @IsNotEmpty()
  signature: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  tranId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ackTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partnerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partnerName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;
}

@Exclude()
export class PayBillDto {}
