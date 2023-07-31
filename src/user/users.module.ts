import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UniqueConstraints } from 'src/ultils/validation.utils';
import { RolesGuard } from 'src/config/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UniqueConstraints, RolesGuard],
  exports: [UserService],
})
export class UserModule {}
