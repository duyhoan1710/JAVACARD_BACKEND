import { Injectable } from '@nestjs/common';

import { LoginRequestDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  async login(body: LoginRequestDto) {
    try {
      const { email, password } = body;
      console.log(email, password);
      return 1;
    } catch (e) {
      console.log(e);
    }
  }
}
