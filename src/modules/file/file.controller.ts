import { FileService } from './file.service';
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import LocalFilesInterceptor from '@src/interceptors/localFiles.interceptor';

@ApiTags('File')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    LocalFilesInterceptor([
      {
        name: 'image',
      },
    ]),
  )
  uploadFile(@UploadedFile() files: { image: Express.Multer.File }) {
    return files?.image[0]?.filename;
  }

  @Get(':file')
  @ApiParam({
    name: 'file',
    type: 'string',
  })
  getFile(@Req() req: Request, @Res() res: Response) {
    const { file } = req.params;
    console.log(req.params);
    const stream = this.fileService.getFile({ file });
    stream.pipe(res);
  }
}
