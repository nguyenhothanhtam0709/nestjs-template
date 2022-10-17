import { USER_ROLE } from '@commons/enums/role';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  maxDevice?: number;

  @Prop({ required: false })
  expTime?: number;

  @Prop({ type: [Types.ObjectId], ref: 'Role', default: [USER_ROLE.USER.id] })
  roles: Types.ObjectId[];

  @Prop({ required: false })
  createdAt?: number;

  @Prop({ default: true })
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
