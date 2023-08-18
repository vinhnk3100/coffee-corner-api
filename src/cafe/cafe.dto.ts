import { IsArray, IsObject, IsString } from 'class-validator';
import { CafeType } from 'src/schemas/cafe.schema';
import { Comment } from 'src/schemas/comment.schema';
import { User } from 'src/schemas/user.schema';

export class CafeDTO {
  @IsString()
  cafe_name: string;

  @IsString()
  cafe_description: string;

  @IsArray()
  cafe_image: string[];

  @IsObject()
  cafe_location: any;

  @IsObject()
  cafe_price: any;

  @IsString()
  cafe_owner: User;

  @IsArray()
  comments: Comment;

  @IsArray()
  thumb_up: User;

  @IsObject()
  open_time: any;

  @IsString()
  status_open: any;

  @IsString()
  admin_approval: any;

  @IsObject()
  current_event: any;

  @IsString()
  cafe_type: CafeType;
}
