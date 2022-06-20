import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulingService {
  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    console.log('abc');
  }
}
