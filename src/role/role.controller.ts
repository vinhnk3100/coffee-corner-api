import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './role.dto';
import { StatusCode } from 'src/ultils/constant/HttpsCode';

@Controller('api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const roles = await this.roleService.findAll();
      if (!roles || roles.length <= 0) {
        return {
          success: 'ok',
          statusCode: StatusCode.NOT_FOUND,
          roles: 'Role not available right now',
        };
      }
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        roles: roles,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: `No role available right now`,
      };
    }
  }

  @Post()
  async createRole(@Body() roleDTO: RoleDTO): Promise<any> {
    try {
      await this.roleService.create(roleDTO);
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: `Create role ${roleDTO.role} successfully`,
      };
    } catch (e) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: e.message,
      };
    }
  }
}
