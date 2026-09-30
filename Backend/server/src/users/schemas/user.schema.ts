import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@common/enums/role.enum.js';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);