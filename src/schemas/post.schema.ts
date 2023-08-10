import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  price: string;

  @Prop()
  content_img: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  thumb_up: User[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    immutable: true,
    required: true,
  })
  userId: User;

  // Comment prop
  // @Prop({
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'Comment',
  // })
  // comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
