import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  providers: [UsersService]
})
export class UsersModule {}
