import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'src/schemas/role.schema';
import { RoleDTO } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleModel.find({}).exec();
  }

  async findById(id: Role): Promise<Role> {
    return await this.roleModel.findById(id).exec();
  }

  async create(roleDTO: RoleDTO): Promise<Role> {
    const newRole = new this.roleModel(roleDTO);
    return await newRole.save();
  }
}
