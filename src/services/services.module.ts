import { Module } from '@nestjs/common';
import { ServicesController } from './controller/services.controller.js';
import { ServicesService } from './service/services.service.js';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
