import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as path from 'path';
interface LocalFilesInterceptorOptions {
  name: string;
  path?: string;
}

function LocalFilesInterceptor(
  options: LocalFilesInterceptorOptions[],
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination: (req, file, cb) => {
            return cb(null, `${process.cwd()}/dist/src/uploads`);
          },
          filename: (req, file, cb) => {
            return cb(
              null,
              file.fieldname +
                '-' +
                Date.now() +
                path.extname(file.originalname),
            );
          },
        }),
      };

      this.fileInterceptor = new (FileFieldsInterceptor(
        options,
        multerOptions,
      ))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export default LocalFilesInterceptor;
