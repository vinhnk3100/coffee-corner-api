import { IsNotEmpty, IsString } from 'class-validator';
import { IsFile } from 'src/auth/common/decorators/file.decorator';
import { User } from 'src/schemas/user.schema';

export class PostDTO {
  @IsFile({ mime: ['image/jpg', 'image/png'] })
  thumbnail: any;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsFile({ mime: ['image/jpg', 'image/png'] })
  content_img: any;

  @IsString()
  rating: string;

  @IsString()
  userId: User;
}
