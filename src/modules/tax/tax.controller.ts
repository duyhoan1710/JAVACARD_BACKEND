import { QueryUserDto } from './../../common/dto/index';
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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Tax')
@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Req() req: Request,
    @Body() body: CreateTaxDto,
    @Query() { identificationId }: QueryUserDto,
  ) {
    return this.taxService.create({ body, identificationId });
  }

  @Get()
  register(@Req() req: Request, @Query() { identificationId }: QueryUserDto) {
    return this.taxService.getList({ identificationId });
  }
}
