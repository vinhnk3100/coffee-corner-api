import { IsNotEmpty, IsArray, IsString } from 'class-validator';
import { Comment } from 'src/schemas/comment.schema';
import { User } from 'src/schemas/user.schema';

export class PostDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsString()
  content_img: string;

  @IsArray()
  thumb_up: User;

  @IsString()
  userId: User;

  @IsArray()
  comments: Comment;
}
