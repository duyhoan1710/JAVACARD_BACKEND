import { EGender } from './../../common/enums/index';
import { JwtGuard } from './../../guards/jwt.guard';
import { UpdateVerifyCodeDto, RechargeDto } from './dtos/user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
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
  @UsePipes(ValidationPipe)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        fullName: {
          type: 'string',
        },
        dateOfBirth: {
          type: 'string',
        },
        gender: {
          enum: Object.values(EGender),
        },
        country: {
          type: 'string',
        },
        hometown: {
          type: 'string',
        },
        address: {
          type: 'string',
        },
        personalIncome: {
          type: 'number',
        },
      },
    },
  })
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'image',
    }),
  )
  updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Body() body,
  ) {
    const userId = req?.user?.userId;

    return this.userService.updateProfile({
      userId,
      ...body,
      image: file?.originalname,
    });
  }

  @Put('/change-verify-code')
  @UseGuards(JwtGuard)
  updatePassword(@Req() req: Request, @Body() body: UpdateVerifyCodeDto) {
    const userId = req?.user?.userId;

    return this.userService.updateVerifyCode({ userId, ...body });
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
