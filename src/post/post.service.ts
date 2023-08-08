import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/post.schema';
import { PostDTO } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postModel.find({}).lean().exec();
  }

  async findById(id: Post): Promise<any> {
    return await this.postModel.findById(id).populate('userId').lean().exec();
  }

  async create(files: any, postDTO: PostDTO): Promise<any> {
    const newPost = new this.postModel({
      thumbnail: files.thumbnail,
      title: postDTO.title,
      content: postDTO.content,
      price: postDTO.price,
      content_img: files.thumbnail,
      rating: postDTO.rating,
      userId: postDTO.userId,
    });
    console.log('Create new Post: ', newPost);
    return await newPost.save();
  }
}
