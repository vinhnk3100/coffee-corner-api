import {
  IsEmail,
  IsISO8601,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from 'src/schemas/role.schema';
import { Unique } from 'src/ultils/validation.utils';

export class UserDTO {
  @IsString()
  avatar: string;

  @MinLength(5)
  @Unique()
  username: string;

  @MinLength(4)
  fullname: string;

  @IsEmail()
  @Unique()
  email: string;

  @IsString()
  status_bio: string;

  @IsISO8601()
  date_of_birth: Date;

  @IsString()
  self_description: string;

  @Matches(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/))
  password: string;

  @IsString()
  roles: Role;
}
