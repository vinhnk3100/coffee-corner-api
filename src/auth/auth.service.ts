import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { comparePassword } from 'src/ultils/auth.utils';
import { User } from 'src/schemas/user.schema';

@Injectable({})
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(username: string, rawpassword: string): Promise<User> {
    const user = await this.userService.findExisted(username);
    const validatePassword = await comparePassword(rawpassword, user?.password);
    if (user && user.username === username && validatePassword) {
      return user;
    }

    return null;
  }
}
