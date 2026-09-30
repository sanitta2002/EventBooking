import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller.js';
import { AuthService } from './service/auth.service.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
