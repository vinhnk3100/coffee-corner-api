import { IsString } from 'class-validator';
import { User } from 'src/schemas/user.schema';

export class RoleDTO {
  @IsString()
  role: string;

  @IsString()
  role_desc: string;

  @IsString()
  users: User;
}
