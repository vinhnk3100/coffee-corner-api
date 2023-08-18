import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Comment } from 'src/schemas/comment.schema';
import { CommentDTO } from './comment.dto';
import { CafeService } from 'src/cafe/cafe.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly cafeService: CafeService,
  ) {}

  async findAll(): Promise<any> {
    return await this.commentModel.find({}).populate('ownerId').lean().exec();
  }

  async create(currentUserId: string, commentDTO: any): Promise<any> {
    const user = await this.userService.findById(currentUserId);
    if (!user) {
      throw new NotFoundException('Invalid user id or user not existed');
    }

    // If comment at postId and post existed
    const post = await this.postService.findOneById(commentDTO.postId);
    const cafe = await this.cafeService.findById(commentDTO.cafeId);
    // Generate first ascendand comment
    if (post) {
      const newPostComment = await new this.commentModel({
        ...commentDTO,
        thumb_up: [],
        comment_descendand: [],
        ownerId: currentUserId,
      });
      await this.postService.updateComment(
        commentDTO.postId,
        newPostComment._id,
      );

      return newPostComment.save();
    }

    if (cafe) {
      const newCafeComment = await new this.commentModel({
        ...commentDTO,
        thumb_up: [],
        comment_descendand: [],
        ownerId: currentUserId,
      });
      await this.cafeService.updateComment(
        commentDTO.cafeId,
        newCafeComment._id,
      );

      return newCafeComment.save();
    }
  }
}
