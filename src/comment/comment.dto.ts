import { IsArray, IsString } from 'class-validator';
import { User } from 'src/schemas/user.schema';
import { Comment } from 'src/schemas/comment.schema';

export class CommentDTO {
  @IsString()
  content: string;

  @IsArray()
  thumb_up: User;

  @IsArray()
  comment_descendand: Comment;

  @IsString()
  ownerId: User;
}
