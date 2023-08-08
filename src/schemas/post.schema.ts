import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: Buffer })
  thumbnail: any;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  price: string;

  @Prop({ type: Buffer })
  content_img: string[];

  @Prop()
  rating: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
