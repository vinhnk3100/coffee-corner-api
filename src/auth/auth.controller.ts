import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StatusCode } from 'src/ultils/constant/HttpsCode';
import { AuthDTO } from './auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() authDTO: AuthDTO) {
    try {
      const validateSignIn = await this.authService.signIn(
        authDTO.username,
        authDTO.password,
      );

      if (!validateSignIn || validateSignIn === null) {
        return {
          success: 'ok',
          statusCode: StatusCode.BAD_REQUEST,
          msg: 'Username or Password is incorrect',
        };
      }
      return {
        success: 'ok',
        statusCode: StatusCode.OK,
        msg: 'Login success',
      };
    } catch (e) {
      return {
        success: 'false',
        statusCode: StatusCode.BAD_REQUEST,
        err: e.message,
      };
    }
  }
}
