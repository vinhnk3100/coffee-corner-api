import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/post.schema';
import { PostDTO } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async findAll(): Promise<any> {
    return await this.postModel
      .find({})
      .populate('thumb_up', 'username')
      .populate('userId', 'avatar username')
      .populate({
        path: 'comments',
        populate: { path: 'ownerId', select: 'username' },
      })
      .lean()
      .exec();
  }

  async findOneById(postId: string): Promise<any> {
    return await this.postModel
      .findById(postId)
      .populate('thumb_up', 'username')
      .populate('userId', 'avatar username')
      .populate({
        path: 'comments',
        populate: { path: 'ownerId', select: 'username' },
      })
      .lean()
      .exec();
  }

  async create(files: any, postDTO: PostDTO, userId: string): Promise<any> {
    const listContentImage = [];
    console.log('Files: ', files);
    files.content_img.map((i: any) => {
      return listContentImage.push(i.originalname);
    });
    const newPost = new this.postModel({
      ...postDTO,
      content_img: listContentImage,
      thumb_up: [],
      userId: userId,
    });
    return await newPost.save();
  }

  async update(postId: string, files: any, postDTO: PostDTO): Promise<any> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Invalid post ID or post not existed');
    }
    let newUpdatePost = {};
    const listContentImage = [];
    if (files.content_img) {
      files.content_img.map((i: any) => {
        return listContentImage.push(i.originalname);
      });
    }

    newUpdatePost = {
      title: postDTO.title,
      content: postDTO.content,
      price: postDTO.price,
      content_img: files.content_img ? listContentImage : undefined,
      thumb_up: postDTO.thumb_up,
    };

    // Prevent from boosting or low thumb_up
    if (postDTO.thumb_up) {
      throw new Error('You cannot change vote');
    }

    return await this.postModel.findByIdAndUpdate(
      { _id: postId },
      { $set: newUpdatePost },
      { new: true },
    );
  }

  async updateComment(postId: string, commentId: any): Promise<any> {
    const commentIdList = [];
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Invalid post ID or post not existed');
    }
    post.comments?.map((comment) => {
      commentIdList.push(comment.toString());
    });
    await this.postModel.findByIdAndUpdate(
      { _id: postId },
      commentIdList.length > 0 && commentIdList.includes(commentId)
        ? { $pull: { comments: commentId } }
        : { $push: { comments: commentId } },
      { new: true },
    );
    return;
  }

  async updateThumbUp(postId: string, userId: string): Promise<any> {
    const userList = [];
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Invalid post ID or post not existed');
    }
    post.thumb_up?.map((user) => {
      userList.push(user.toString());
    });
    await this.postModel.findByIdAndUpdate(
      { _id: postId },
      userList.length > 0 && userList.includes(userId)
        ? { $pull: { thumb_up: userId } }
        : { $push: { thumb_up: userId } },
      { new: true },
    );
    return userList.length > 0 && userList.includes(userId);
  }

  async delete(postId: string): Promise<Post> {
    return await this.postModel.findByIdAndRemove(postId);
  }
}
