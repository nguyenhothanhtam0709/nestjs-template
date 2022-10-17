import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  permissions: string[];

  @Prop({ required: true, default: false })
  isStatic: boolean;

  @Prop({ required: false })
  createdAt: number;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
