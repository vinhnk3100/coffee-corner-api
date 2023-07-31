import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/ultils/constant/Role';

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

  @Prop({ type: [String], enum: Role, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
