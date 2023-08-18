import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cafe } from 'src/schemas/cafe.schema';
import { Model, Types } from 'mongoose';
import { CafeDTO } from './cafe.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CafeService {
  constructor(
    @InjectModel(Cafe.name) private readonly cafeModel: Model<Cafe>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<any> {
    return await this.cafeModel
      .find({})
      .populate({
        path: 'comments',
        populate: { path: 'ownerId', select: 'username' },
      })
      .lean()
      .exec();
  }

  async findById(cafeId: string): Promise<any> {
    return await this.cafeModel
      .findById(cafeId)
      .populate({
        path: 'comments',
        populate: { path: 'ownerId', select: 'username' },
      })
      .lean()
      .exec();
  }

  async create(files: any, cafeDTO: CafeDTO, userId: string): Promise<any> {
    const listContentImage = [];
    let currentUserIsAdmin = 0;
    const user = await this.userService.findById(userId);
    user.roles.map((role) => {
      if (role === 'ADMIN') currentUserIsAdmin = 1;
    });
    if (files.cafe_image) {
      files.cafe_image.map((i: any) => {
        return listContentImage.push(i.originalname);
      });
    }

    const newPost = new this.cafeModel({
      ...cafeDTO,
      status_open: cafeDTO.status_open,
      admin_approval: currentUserIsAdmin ? '0' : '1',
      cafe_image: listContentImage,
      thumb_up: [],
    });
    return await newPost.save();
  }

  async update(files: any, cafeId: string, cafeDTO: CafeDTO): Promise<any> {
    const listContentImage = [];
    if (files.cafe_image) {
      files.cafe_image.map((i: any) => {
        return listContentImage.push(i.originalname);
      });
    }
    const newCafe = {
      ...cafeDTO,
      cafe_image: listContentImage,
    };
    return await this.cafeModel.findByIdAndUpdate(
      { _id: cafeId },
      { $set: newCafe },
      { new: true },
    );
  }

  async updateComment(cafeId: string, commentId: any): Promise<any> {
    const commentIdList = [];
    const cafe = await this.cafeModel.findById(cafeId);
    if (!cafe) {
      throw new NotFoundException('Invalid cafe ID or cafe not existed');
    }
    cafe.comments?.map((comment) => {
      commentIdList.push(comment.toString());
    });
    await this.cafeModel.findByIdAndUpdate(
      { _id: cafeId },
      commentIdList.length > 0 && commentIdList.includes(commentId)
        ? { $pull: { comments: commentId } }
        : { $push: { comments: commentId } },
      { new: true },
    );
    return;
  }

  async updateThumbUp(cafeId: string, userId: string): Promise<any> {
    const userList = [];
    const cafe = await this.cafeModel.findById(cafeId);
    if (!cafe) {
      throw new NotFoundException('Invalid cafe ID or cafe not existed');
    }
    cafe.thumb_up?.map((user) => {
      userList.push(user.toString());
    });
    await this.cafeModel.findByIdAndUpdate(
      { _id: cafeId },
      userList.length > 0 && userList.includes(userId)
        ? { $pull: { thumb_up: userId } }
        : { $push: { thumb_up: userId } },
      { new: true },
    );

    return userList.length > 0 && userList.includes(userId);
  }

  async updateWithoutFiles(cafeId: string, cafeDTO: CafeDTO): Promise<any> {
    return await this.cafeModel.findByIdAndUpdate(
      { _id: cafeId },
      { $set: cafeDTO },
      { new: true },
    );
  }

  async delete(cafeId: string): Promise<any> {
    return await this.cafeModel.findByIdAndRemove(cafeId).exec();
  }
}
