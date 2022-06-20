import { EGender } from './../../common/enums/index';
import { JwtGuard } from './../../guards/jwt.guard';
import { RechargeDto, UpdateProfileUser } from './dtos/user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import LocalFilesInterceptor from '@src/interceptors/localFiles.interceptor';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() req: Request) {
    const userId = req?.user?.userId;

    return this.userService.getProfile({ userId });
  }

  @Put()
  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
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
        name: 'fingerPrintImage',
      },
    ]),
  )
  updateProfile(
    @UploadedFiles()
    files: {
      avatarImage: Express.Multer.File[];
      fingerPrintImage: Express.Multer.File[];
    },
    @Req() req: Request,
    @Body() body: UpdateProfileUser,
  ) {
    const userId = req?.user?.userId;

    return this.userService.updateProfile({
      userId,
      ...body,
      avatarImage: files?.avatarImage[0]?.originalname,
      fingerPrintImage: files?.fingerPrintImage[0]?.originalname,
    });
  }

  @Put('/recharge')
  @UseGuards(JwtGuard)
  recharge(@Req() req: Request, @Body() body: RechargeDto) {
    const userId = req?.user?.userId;

    return this.userService.recharge({ userId, ...body });
  }

  @Put('/pay-bill')
  @UseGuards(JwtGuard)
  payBill(@Req() req: Request, @Body() body: RechargeDto) {
    const userId = req?.user?.userId;

    return this.userService.payBill({ userId, ...body });
  }
}
