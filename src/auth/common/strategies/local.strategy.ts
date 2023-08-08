import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { StatusCode } from 'src/ultils/constant/HttpsCode';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // Config passport strategy here (google - facebook login)
  }

  async validate(username: string, rawPassword: string): Promise<any> {
    const user = await this.authService.validateUser(username, rawPassword);
    if (!user) {
      return {
        success: 'false',
        statusCode: StatusCode.UNAUTHORIZED,
        msg: 'Username or password is not existed or incorrect',
      };
    }
    return user;
  }
}
