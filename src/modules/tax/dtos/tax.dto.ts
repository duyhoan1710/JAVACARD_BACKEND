import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class CreateTaxDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  personalIncome: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  deduction: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  insuranceDeduction: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  totalTax: number;
}
