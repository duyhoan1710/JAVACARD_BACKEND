import { TaxModule } from './tax/tax.module';
import { FileModule } from './file/file.module';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SchedulingModule } from './scheduling/scheduling.module';

@Module({
  imports: [AuthModule, UserModule, FileModule, TaxModule, SchedulingModule],
  exports: [],
})
export class ServiceModule {}
