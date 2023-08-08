import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './common/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './common/strategies/refreshToken.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
