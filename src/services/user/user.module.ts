import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';

import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

const repositories = [UserRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories)],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class UserModule {}
