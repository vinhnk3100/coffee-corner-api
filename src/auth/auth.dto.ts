import { MinLength, IsString } from 'class-validator';

export class AuthDTO {
  @MinLength(5)
  @IsString()
  username: string;

  @IsString()
  password: string;
}
