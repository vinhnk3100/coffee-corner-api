import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop()
  role: string;

  @Prop()
  role_desc: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
