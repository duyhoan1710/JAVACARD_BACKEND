import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConnectionModule } from 'common/connections/connections.module';
import { ServiceModule } from 'services/services.module';

@Module({
  imports: [ConnectionModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
