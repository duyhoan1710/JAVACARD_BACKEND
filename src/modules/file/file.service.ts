import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createReadStream } from 'fs';
import { FILE_NOT_EXIST } from '@src/constants/errorContext';

@Injectable()
export class FileService {
  getFile({ file }) {
    const path = `${process.cwd()}/dist/src/uploads/${file}`;

    try {
      return createReadStream(path);
    } catch (err) {
      throw new HttpException(
        {
          context: FILE_NOT_EXIST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
