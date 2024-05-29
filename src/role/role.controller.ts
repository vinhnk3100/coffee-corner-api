import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './role.dto';
import { StatusCode } from 'src/ultils/constant/HttpsCode';
import { Roles } from 'src/auth/common/decorators/role.decorator';

@Controller('api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles('ADMIN')
  async findAll(): Promise<any> {
    try {
      const roles = await this.roleService.findAll();
      if (!roles || roles.length <= 0) {
        return {
          success: true,
          statusCode: StatusCode.NOT_FOUND,
          roles: 'Role not available right now',
        };
      }
      return {
        success: true,
        statusCode: StatusCode.OK,
        roles: roles,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        msg: `No role available right now`,
      };
    }
  }

  @Post()
  @Roles('ADMIN')
  async createRole(@Body() roleDTO: RoleDTO): Promise<any> {
    try {
      await this.roleService.create(roleDTO);
      return {
        success: true,
        statusCode: StatusCode.OK,
        msg: `Create role ${roleDTO.role} successfully`,
      };
    } catch (e) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        msg: e.message,
      };
    }
  }

  @Put(':id')
  @Roles('ADMIN')
  async updateRole(@Param('id') id, @Body() roleDTO: RoleDTO): Promise<any> {
    try {
      const role = await this.roleService.update(id, roleDTO);
      return {
        success: true,
        statusCode: StatusCode.OK,
        msg: `Update role ${role.role} successfully`,
      };
    } catch (e) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        msg: e.message,
      };
    }
  }

  @Delete(':id')
  @Roles('ADMIN')
  async deleteRole(@Param('id') id, @Body() roleDTO: RoleDTO): Promise<any> {
    try {
      await this.roleService.delete(id);
      return {
        success: true,
        statusCode: StatusCode.OK,
        msg: `Delete role ${roleDTO.role} successfully`,
      };
    } catch (e) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        msg: e.message,
      };
    }
  }
}
