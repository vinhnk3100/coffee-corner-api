import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from './role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  avatar: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  status_bio: string;

  @Prop()
  date_of_birth: Date;

  @Prop()
  self_description: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
