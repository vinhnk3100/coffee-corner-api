import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { AccessTokenGuard } from './auth/common/guards/accessToken.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/common/guards/role.guard';
import { PostModule } from './post/post.module';
import { IsPostOwnerGuard } from './auth/common/guards/isPostOwner.guard';
import { CoffeeModule } from './coffee/coffee.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        uri: process.env.DB_URI,
        ssl: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
    }),
    UserModule,
    AuthModule,
    RoleModule,
    PostModule,
    CoffeeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: IsPostOwnerGuard,
    },
  ],
})
export class AppModule {}
