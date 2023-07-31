import { Model } from 'mongoose';
import { Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { UserDTO } from './user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(userDTO: UserDTO): Promise<User> {
    const newUser = new this.userModel(userDTO);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find({}, ['-password']).populate('roles');
  }

  async findById(id: User): Promise<User> {
    return await this.userModel.findById(id).populate('roles').exec();
  }

  async findExisted(property: string, value?: User): Promise<any> {
    return await this.userModel.findOne({ [property]: value }).exec();
  }

  async update(id: User, userDTO: UserDTO): Promise<User> {
    console.log(userDTO);
    return await this.userModel
      .findByIdAndUpdate(
        { _id: id },
        { $set: userDTO },
        { upsert: true, new: true },
      )
      .select(['-password']);
  }

  async delete(id: User): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
