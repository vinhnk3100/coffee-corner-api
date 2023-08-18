import { Module } from '@nestjs/common';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cafe, CafeSchema } from 'src/schemas/cafe.schema';
import { UserModule } from 'src/user/users.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Cafe.name, schema: CafeSchema }]),
  ],
  controllers: [CafeController],
  providers: [CafeService],
  exports: [CafeService],
})
export class CafeModule {}
