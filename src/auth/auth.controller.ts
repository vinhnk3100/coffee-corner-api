import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StatusCode } from 'src/ultils/constant/HttpsCode';
import { LocalAuthGuard } from './common/guards/local-auth.guard';
import { UserDTO } from 'src/user/user.dto';
import { RefreshTokenGuard } from './common/guards/refreshToken.guard';
import { GetCurrentUser } from './common/decorators/getCurrentUser.decorator';
import { Public } from './common/decorators/public.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() userDTO: UserDTO): Promise<any> {
    try {
      await this.authService.signUp(userDTO);
      return {
        success: true,
        statusCode: StatusCode.OK,
        msg: 'Signup success. Proceed to login page...',
      };
    } catch (e) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@GetCurrentUser() user: any): Promise<any> {
    try {
      const data = await this.authService.signIn(user);
      if (data.statusCode === 401) return data;

      return {
        success: true,
        statusCode: StatusCode.OK,
        msg: 'Login success. Proceed to next page... ',
        data: data.tokens,
      };
    } catch (e) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }

  @Post('signout')
  async signOut(@GetCurrentUser('id') userId: any): Promise<any> {
    try {
      await this.authService.signOut(userId);
      return {
        success: true,
        statusCode: StatusCode.OK,
        msg: 'Logout success. Proceed to login page... ',
      };
    } catch (e) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(
    @GetCurrentUser('id') userId: any,
    @Request() req,
  ): Promise<any> {
    try {
      const refreshToken = req
        .get('authorization')
        .replace('Bearer', '')
        .trim();
      const tokens = await this.authService.refreshToken(userId, refreshToken);
      return {
        success: true,
        statusCode: StatusCode.OK,
        data: tokens,
      };
    } catch (e) {
      return {
        success: false,
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }
}
