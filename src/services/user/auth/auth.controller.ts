import { Controller, Body, Post } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    return await this.authService.login(body);
  }
}
