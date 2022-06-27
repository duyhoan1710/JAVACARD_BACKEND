import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EGender } from '@src/common/enums';
import LocalFilesInterceptor from '@src/interceptors/localFiles.interceptor';

import { AuthService } from './auth.service';
import { LoginRequestDto, RegisterRequestDto } from './dtos/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // @UsePipes(ValidationPipe)
  // login(@Body() body: LoginRequestDto) {
  //   return this.authService.login(body);
  // }

  @Post('register')
  @UsePipes(ValidationPipe)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cardId: {
          type: 'number',
        },
        avatarImage: {
          type: 'string',
          format: 'binary',
        },
        avatarFingerImage: {
          type: 'string',
          format: 'binary',
        },
        fullName: {
          type: 'string',
        },
        birthday: {
          type: 'string',
        },
        sex: {
          type: 'number',
          enum: Object.values(EGender),
        },
        national: {
          type: 'string',
        },
        original: {
          type: 'string',
        },
        address: {
          type: 'string',
        },
        personalIdentification: {
          type: 'string',
        },
        publicKey: {
          type: 'string',
        },
        releaseDate: {
          type: 'datetime',
        },
        expiredDate: {
          type: 'datetime',
        },
        autoPay: {
          type: 'boolean',
        },
      },
    },
  })
  @UseInterceptors(
    LocalFilesInterceptor([
      {
        name: 'avatarImage',
      },
      {
        name: 'avatarFingerImage',
      },
    ]),
  )
  register(
    @Body() body: RegisterRequestDto,
    @UploadedFiles()
    files: {
      avatarImage: Express.Multer.File[];
      avatarFingerImage: Express.Multer.File[];
    },
  ) {
    return this.authService.register({
      body,
      avatarImage: files.avatarImage[0]?.filename,
      fingerPrintImage: files.avatarFingerImage[0]?.filename,
    });
  }
}
