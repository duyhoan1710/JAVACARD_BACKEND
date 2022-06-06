import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';

import { AuthMiddleware } from 'common/middlewares/auth.middleware';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: '/api/user',
    module: UserModule,
  },
];

@Module({
  imports: [RouterModule.forRoutes(routes), UserModule],
})
export class ServiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes({ path: '/api/user/*', method: RequestMethod.ALL });
  }
}
