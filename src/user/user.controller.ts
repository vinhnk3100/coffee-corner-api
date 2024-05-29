import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { StatusCode } from 'src/ultils/constant/HttpsCode';
import { UserService } from './user.service';
import { hashPassword } from '../ultils/auth.utils';
import { Roles } from 'src/auth/common/decorators/role.decorator';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('ADMIN')
  @Get()
  async findAll(): Promise<any> {
    try {
      const users = await this.userService.findAll();
      if (!users || users.length <= 0) {
        return {
          success: true,
          statusCode: StatusCode.NOT_FOUND,
          users: 'User not available right now',
        };
      }
      return {
        success: true,
        statusCode: StatusCode.OK,
        user: users,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        msg: `No user available right now`,
      };
    }
  }

  @Roles('ADMIN')
  @Get(':id')
  async findOne(@Param('id') id): Promise<any> {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return {
          success: true,
          statusCode: StatusCode.NOT_FOUND,
          user: 'User ID is invalid or not existed',
        };
      }
      return {
        success: true,
        statusCode: StatusCode.OK,
        user: user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async createUser(@Body() userDTO: UserDTO) {
    try {
      const password = userDTO.password;
      const newUser = { ...userDTO, password: await hashPassword(password) };
      await this.userService.create(newUser);
      return {
        success: true,
        statusCode: StatusCode.OK,
        msg: `Create user ${userDTO.username} successfully`,
        user: newUser,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Roles('ADMIN')
  @Put(':id')
  async updateUser(@Param('id') id, @Body() userDTO: UserDTO) {
    try {
      await this.userService.update(id, userDTO);
      return {
        success: true,
        statusCode: StatusCode.OK,
        msg: `Update user ${id} successfully`,
      };
    } catch (e) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }

  @Roles('ADMIN')
  @Delete(':id')
  async deleteUser(@Param('id') id) {
    try {
      const user = await this.userService.delete(id);
      return {
        success: true,
        statusCode: StatusCode.OK,
        msg: `User ${id} delete successfully`,
        user: user,
      };
    } catch (e) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }
}
