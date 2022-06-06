import { Body, Controller, Get, Req } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { UserService } from './user.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    console.log(req);
    return await this.userService.getOne();
  }
}
