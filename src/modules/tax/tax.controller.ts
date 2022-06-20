import { JwtGuard } from './../../guards/jwt.guard';
import { TaxService } from './tax.service';
import { CreateTaxDto } from './dtos/tax.dto';
import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Tax')
@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtGuard)
  create(@Req() req: Request, @Body() body: CreateTaxDto) {
    const userId = req.user.userId;
    return this.taxService.create({ body, userId });
  }

  @Get()
  @UseGuards(JwtGuard)
  register(@Req() req: Request) {
    const userId = req.user.userId;

    return this.taxService.getList({ userId });
  }
}
