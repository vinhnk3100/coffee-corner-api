import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { comparePassword } from 'src/ultils/auth.utils';
import { User } from 'src/schemas/user.schema';
import { StatusCode } from 'src/ultils/constant/HttpsCode';

@Injectable({})
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, rawpassword: string): Promise<any> {
    try {
      const user = await this.userService.findExisted(username);
      const validatePassword = await comparePassword(
        rawpassword,
        user?.password,
      );
      if (user && user.username === username && validatePassword) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user._doc;
        return rest;
      }
      return null;
    } catch (e) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }
}
