import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // Config passport strategy here (google - facebook login)
  }

  async validate(username: string, rawPassword: string): Promise<User> {
    const user = await this.authService.validateUser(username, rawPassword);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
