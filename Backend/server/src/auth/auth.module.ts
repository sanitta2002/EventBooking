import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller.js';
import { AuthService } from './service/auth.service.js';
import { UsersModule } from '@users/users.module.js';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
   imports: [UsersModule,
    JwtModule.register({
      secret:process.env.JWT_ACCESS_SECRET,
      signOptions:{
         expiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN),
      }
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
    useClass: JwtService,
  },
  ],

  exports: ['IAuthService',JwtModule],
})
export class AuthModule {}
