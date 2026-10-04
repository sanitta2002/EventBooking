import { Module } from '@nestjs/common';
import { ServicesController } from './controller/services.controller.js';
import { ServicesService } from './service/services.service.js';
import { AuthModule } from '@auth/auth.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './schemas/service.schema.js';
import { ServiceRepository } from './repositories/service.repository.js';
import { CommonModule } from '@common/common.module.js';

@Module({
   imports: [AuthModule,
    CommonModule,
    MongooseModule.forFeature([{
      name:Service.name,schema:ServiceSchema
    }])
   ],
  controllers: [ServicesController],
  providers: [ServicesService,
    {
      provide: 'IServiceRepository',
      useClass: ServiceRepository,
    },
    {
    provide: 'IServicesService',
    useClass: ServicesService,
  },
  ],
  exports: ['IServiceRepository','IServicesService'],
})
export class ServicesModule {}
