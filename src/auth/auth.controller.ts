import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StatusCode } from 'src/ultils/constant/HttpsCode';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req): Promise<any> {
    try {
      const user = req.user;
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: 'Login success',
        user: user,
      };
    } catch (e) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }

  @Post('signout')
  async signOut(@Request() req): Promise<any> {
    try {
      req.logout();
    } catch (e) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }
}
