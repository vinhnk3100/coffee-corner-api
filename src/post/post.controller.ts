import {
  Controller,
  Get,
  Body,
  UseInterceptors,
  UploadedFiles,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { StatusCode } from 'src/ultils/constant/HttpsCode';
import { PostDTO } from './post.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IsPostOwner } from 'src/auth/common/decorators/isPostOwner';
import { GetCurrentUser } from 'src/auth/common/decorators/getCurrentUser.decorator';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const posts = await this.postService.findAll();
      if (!posts || posts.length <= 0) {
        return {
          success: 'ok',
          statusCode: StatusCode.NOT_FOUND,
          users: 'Post not available right now',
        };
      }
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        posts: posts,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: `No post available right now`,
      };
    }
  }

  @Get(':postId')
  async findOne(@Param('postId') postId): Promise<any> {
    try {
      const post = await this.postService.findOneById(postId);
      if (!post || post.length <= 0) {
        return {
          success: 'ok',
          statusCode: StatusCode.NOT_FOUND,
          users: 'Invalid post ID or post not existed',
        };
      }
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        post: post,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'content_img' }]))
  async createPost(
    @UploadedFiles()
    files: {
      content_img?: Array<Express.Multer.File>;
    },
    @GetCurrentUser('id') userId: any,
    @Body() postDTO: PostDTO,
  ): Promise<any> {
    try {
      const newPost = await this.postService.create(files, postDTO, userId);
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: `Create post successfully`,
        post: newPost,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Put('/action/thumbup/:postId')
  async thumbUpPost(
    @GetCurrentUser('id') userId: string,
    @Param('postId') postId: string,
  ): Promise<any> {
    try {
      const postThumbUpEvent = await this.postService.updateThumbUp(
        postId,
        userId,
      );

      if (postThumbUpEvent) {
        return {
          success: 'ok',
          statusCode: StatusCode.OK,
          msg: `Thumb down post success`,
        };
      }

      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: `Thumb up post success`,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Put(':postId')
  @IsPostOwner()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'content_img' }]))
  async updatePost(
    @Param('postId') postId,
    @UploadedFiles()
    files: {
      content_img?: Array<Express.Multer.File>;
    },
    @Body() postDTO: PostDTO,
  ): Promise<any> {
    try {
      const updatePost = await this.postService.update(postId, files, postDTO);
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: `Update post ${postId} successfully`,
        updatePost: updatePost,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }

  @Delete(':postId')
  @IsPostOwner()
  async deletePost(@Param('postId') postId): Promise<any> {
    try {
      const post = await this.postService.delete(postId);
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: `Delete post ${postId} successfully`,
        post: post,
      };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }
}
