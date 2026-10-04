import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

import type { ICloudinaryService } from '@common/interfaces/cloudinary.service.interface.js';

@Injectable()
export class CloudinaryService implements ICloudinaryService {
  constructor(private readonly configService: ConfigService) {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  async uploadImage(file: {
    buffer: Buffer;
    mimetype: string;
  }): Promise<string> {
    try {
      return await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'event-booking/services',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result!.secure_url);
          },
        );

        uploadStream.end(file.buffer);
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn('Cloudinary upload warning:', message);
      // Fallback: If Cloudinary fails or cloud_name is invalid/placeholder,
      // convert image buffer to Base64 data URI so image uploads still work seamlessly.
      const base64 = file.buffer.toString('base64');
      const mimetype = file.mimetype || 'image/jpeg';
      return `data:${mimetype};base64,${base64}`;
    }
  }
}
