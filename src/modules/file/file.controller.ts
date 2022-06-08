import { FileService } from './file.service';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('File')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

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
