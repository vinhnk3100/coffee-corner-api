import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import { StatusCode } from 'src/ultils/constant/HttpsCode';
import { PostDTO } from './post.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<any> {
    try {
      const posts = await this.postService.findAll();
      console.log(posts);
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

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'content_img' },
    ]),
  )
  async createPost(
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File;
      content_img?: Array<Express.Multer.File>;
    },
    @Body() postDTO: PostDTO,
  ): Promise<any> {
    try {
      await this.postService.create(files, postDTO);
      //   return {
      //     success: 'ok',
      //     statusCode: StatusCode.OK,
      //     msg: `Create user ${userDTO.username} successfully`,
      //     user: newUser,
      //   };
    } catch (error) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        msg: error.message,
      };
    }
  }
}
