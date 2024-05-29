import { Controller, Post, Get, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { StatusCode } from 'src/ultils/constant/HttpsCode';
import { GetCurrentUser } from 'src/auth/common/decorators/getCurrentUser.decorator';
import { Roles } from 'src/auth/common/decorators/role.decorator';

@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @Roles('ADMIN')
  async findAll(): Promise<any> {
    try {
      const comments = await this.commentService.findAll();
      if (!comments || comments.length <= 0) {
        return {
          success: true,
          statusCode: StatusCode.NOT_FOUND,
          users: 'Comment not available right now',
        };
      }
      return {
        success: true,
        statusCode: StatusCode.OK,
        comments: comments,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        msg: `No comment available right now`,
      };
    }
  }

  @Post()
  async createComment(
    @GetCurrentUser('id') currentUserId: any,
    @Body() commentDTO: any,
  ): Promise<any> {
    try {
      console.log('userId: ', currentUserId);
      const comment = await this.commentService.create(
        currentUserId,
        commentDTO,
      );
      return {
        success: true,
        statusCode: StatusCode.OK,
        msg: `Comment successfully`,
        comment: comment,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }
}
