import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'src/schemas/role.schema';
import { RoleDTO } from './role.dto';
import { Roles } from 'src/auth/common/decorators/role.decorator';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  @Roles('ADMIN')
  async findAll(): Promise<Role[]> {
    return await this.roleModel.find({}).lean().exec();
  }

  @Roles('ADMIN')
  async findById(id: Role): Promise<Role> {
    return await this.roleModel.findById(id).lean().exec();
  }

  @Roles('ADMIN')
  async create(roleDTO: RoleDTO): Promise<Role> {
    const newRole = new this.roleModel(roleDTO);
    return await newRole.save();
  }

  @Roles('ADMIN')
  async update(id: Role, roleDTO: RoleDTO): Promise<Role> {
    return await this.roleModel
      .findByIdAndUpdate({ _id: id }, { $set: roleDTO }, { new: true })
      .exec();
  }

  @Roles('ADMIN')
  async delete(id: Role): Promise<Role> {
    return await this.roleModel.findByIdAndDelete(id).exec();
  }
}
