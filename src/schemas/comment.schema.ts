import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  content: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  thumb_up: User[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
  })
  comment_descendand: Comment[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    immutable: true,
    required: true,
  })
  ownerId: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
