import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service.js';
import { UsersController } from './controller/users.controller.js';
import type { StringValue } from 'ms';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';
import { UserRepository } from './repositories/user.repository.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get<StringValue>('JWT_ACCESS_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  exports: ['IUserRepository', UsersService],
})
export class UsersModule {}
