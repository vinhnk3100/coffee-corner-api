import {
  Body,
  Controller,
  Post,
  Get,
  UploadedFiles,
  UseInterceptors,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeDTO } from './cafe.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser } from 'src/auth/common/decorators/getCurrentUser.decorator';
import { StatusCode } from 'src/ultils/constant/HttpsCode';
import { Roles } from 'src/auth/common/decorators/role.decorator';

@Controller('api/cafe')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Get()
  async findAllCafe(): Promise<any> {
    try {
      const cafes = await this.cafeService.findAll();
      if (!cafes || cafes.length < 1) {
        return {
          success: 'ok',
          statusCode: StatusCode.NOT_FOUND,
          msg: 'There are currently not any suggest cafes right now',
        };
      }
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        cafes: cafes,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Get(':cafeId')
  async findOneById(@Param('cafeId') cafeId): Promise<any> {
    try {
      const cafe = await this.cafeService.findById(cafeId);
      if (!cafe) {
        return {
          success: 'ok',
          statusCode: StatusCode.NOT_FOUND,
          msg: 'There are currently not any suggest cafes right now',
        };
      }
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        cafe: cafe,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Post()
  @Roles('ADMIN', 'COFFEE OWNER')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'cafe_image' }]))
  async createCafe(
    @UploadedFiles()
    files: {
      cafe_image?: Array<Express.Multer.File>;
    },
    @Body() cafeDTO: CafeDTO,
    @GetCurrentUser('id') userId: string,
  ): Promise<any> {
    try {
      const cafe = await this.cafeService.create(files, cafeDTO, userId);
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: 'New suggest cafe has been created',
        cafe:
          cafe.cafe_name +
          ' ' +
          cafe.cafe_location.address +
          ' ' +
          cafe.cafe_location.district,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Put('/approve/:cafeId')
  @Roles('ADMIN')
  async adminApproval(@Param('cafeId') cafeId, @Body() cafeDTO: CafeDTO) {
    try {
      const cafe = await this.cafeService.updateWithoutFiles(cafeId, cafeDTO);
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg:
          cafe.admin_approval === 0
            ? `Admin has unapproved this cafe.`
            : `Admin has approved this cafe.`,
        updateApproval: 'Admin approved',
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Put('/action/thumbup/:cafeId')
  async thumbUpPost(
    @GetCurrentUser('id') userId: string,
    @Param('cafeId') cafeId: string,
  ): Promise<any> {
    try {
      const cafeThumbUpEvent = await this.cafeService.updateThumbUp(
        cafeId,
        userId,
      );

      if (cafeThumbUpEvent) {
        return {
          success: 'ok',
          statusCode: StatusCode.OK,
          msg: `Thumb down cafe success`,
        };
      }

      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: `Thumb up cafe success`,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Put(':cafeId')
  @Roles('ADMIN', 'COFFEE OWNER')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'cafe_image' }]))
  async updateCafe(
    @UploadedFiles()
    files: {
      cafe_image?: Array<Express.Multer.File>;
    },
    @Param('cafeId') cafeId,
    @Body() cafeDTO: CafeDTO,
  ) {
    try {
      console.log('Run at UpdateCafe');
      const updateCafe = await this.cafeService.update(files, cafeId, cafeDTO);
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: `Update suggest cafe successfully`,
        updateCafe: updateCafe,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Delete(':cafeId')
  @Roles('ADMIN', 'COFFEE OWNER')
  async deleteCafe(@Param('cafeId') cafeId) {
    try {
      const cafe = await this.cafeService.delete(cafeId);
      if (!cafe) {
        return {
          success: 'ok',
          statusCode: StatusCode.NOT_FOUND,
          msg: 'Invalid ID or cafe not found',
        };
      }
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        cafe: `Delete cafe ${"'" + cafe.cafe_name + "'"} success`,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }
}
