import { Module } from '@nestjs/common';
import { CloudinaryService } from '@common/services/cloudinary.service.js';

@Module({
  providers: [
    {
      provide: 'ICloudinaryService',
      useClass: CloudinaryService,
    },
  ],
  exports: ['ICloudinaryService'],
})
export class CommonModule {}