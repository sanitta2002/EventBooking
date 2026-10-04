import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller.js';
import { AuthService } from './service/auth.service.js';
import { UsersModule } from '@users/users.module.js';
import { JwtModule, JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtService as CustomJwtService } from './service/jwt.service.js';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
@Module({
   imports: [UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get<StringValue>('JWT_ACCESS_EXPIRES_IN'),
        },
      }),
    })
   ],

  controllers: [AuthController],

  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
     {
      provide: 'IJWTService',
      useClass: CustomJwtService,
    },
  ],

  exports: ['IAuthService',JwtModule],
})
export class AuthModule {}
