import { Model } from 'mongoose';
import { Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDTO } from './user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(userDTO: UserDTO): Promise<any> {
    const newUser = new this.userModel(userDTO);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find({}, ['-password']).lean().exec();
  }

  async findById(id: any): Promise<any> {
    return await this.userModel.findById(id).populate('roles').lean().exec();
  }

  async findExisted(property: string, value?: any): Promise<any> {
    return await this.userModel
      .findOne({ [property]: value })
      .lean()
      .exec();
  }

  async update(id: User, userDTO: UserDTO): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate({ _id: id }, { $set: userDTO }, { new: true })
      .select(['-password']);
  }

  async updateRefreshToken(id: User, refreshToken: string): Promise<any> {
    return await this.userModel.updateMany(
      { _id: id },
      { refreshToken: refreshToken },
      {
        new: true,
      },
    );
  }

  async delete(id: User): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
