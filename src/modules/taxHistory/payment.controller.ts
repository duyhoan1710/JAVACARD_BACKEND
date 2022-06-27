import { QueryUserDto } from './../../common/dto/index';
import { Controller, Body, Post, Get, Req, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TaxHistoryService } from './taxHistory.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly taxHistoryService: TaxHistoryService) {}

  @Get()
  payment(@Req() req: Request, @Query() { identificationId }: QueryUserDto) {
    return this.taxHistoryService.getListPaymentHistory({ identificationId });
  }
}
