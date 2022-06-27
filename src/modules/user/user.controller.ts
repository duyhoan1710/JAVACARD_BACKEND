import { QueryUserDto } from './../../common/dto/index';
import { EGender } from './../../common/enums/index';
import { JwtGuard } from './../../guards/jwt.guard';
import { RechargeDto, UpdateProfileUser } from './dtos/user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import LocalFilesInterceptor from '@src/interceptors/localFiles.interceptor';

@ApiTags('User')
// @ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  getProfile(@Req() req: Request, @Query() { identificationId }: QueryUserDto) {
    return this.userService.getProfile({ identificationId });
  }

  @Put()
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
    @Query() { identificationId }: QueryUserDto,
  ) {
    return this.userService.updateProfile({
      identificationId,
      ...body,
      avatarImage: !!files?.avatarImage?.length
        ? files?.avatarImage[0]?.originalname
        : null,
      fingerPrintImage: !!files?.fingerPrintImage?.length
        ? files?.fingerPrintImage[0]?.originalname
        : null,
    });
  }

  @Put('/recharge')
  recharge(@Req() req: Request, @Body() body: RechargeDto) {
    const { comment } = body;

    return this.userService.recharge({ identificationId: comment, ...body });
  }

  @Put('/pay-bill')
  payBill(@Req() req: Request, @Query() { identificationId }: QueryUserDto) {
    return this.userService.payBill({ identificationId });
  }
}
