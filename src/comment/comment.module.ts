import { Module } from '@nestjs/common';
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from 'src/user/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/schemas/comment.schema';
import { PostModule } from 'src/post/post.module';
import { CafeModule } from 'src/cafe/cafe.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    CafeModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
