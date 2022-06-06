import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const CommonController =
  (controllerName = ''): ClassDecorator =>
  (target: any) => {
    ApiTags(`common:${controllerName}`)(target);
    Controller(`api/${controllerName}`)(target);
  };

export const UserController =
  (controllerName = ''): ClassDecorator =>
  (target: any) => {
    ApiTags(`user:${controllerName}`)(target);
    Controller(`api/user/${controllerName}`)(target);
  };
