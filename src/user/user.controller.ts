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

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const users = await this.userService.findAll();
      if (!users || users.length <= 0) {
        return {
          success: 'ok',
          statusCode: StatusCode.NOT_FOUND,
          users: 'User not available right now',
        };
      }
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        user: users,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: `No user available right now`,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<any> {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return {
          success: 'ok',
          statusCode: StatusCode.NOT_FOUND,
          user: 'User ID is invalid or not existed',
        };
      }
      return {
        success: 'ok',
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
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: `Create user ${userDTO.username} successfully`,
        user: newUser,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id, @Body() userDTO: UserDTO) {
    try {
      const updateUser = await this.userService.update(id, userDTO);
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: `Update user ${id} successfully`,
        user: updateUser,
      };
    } catch (e) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id) {
    try {
      const user = await this.userService.delete(id);
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: `User ${id} delete successfully`,
        user: user,
      };
    } catch (e) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }
}
