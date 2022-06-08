import { FileService } from './file.service';
import { FileController } from './file.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
