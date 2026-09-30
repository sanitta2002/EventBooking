import { Module } from '@nestjs/common';
import { ServicesController } from './controller/services.controller.js';
import { ServicesService } from './service/services.service.js';
import { AuthModule } from '@auth/auth.module.js';

@Module({
   imports: [AuthModule],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
