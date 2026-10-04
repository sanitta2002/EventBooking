import { AdminGuard } from '@common/guards/admin.guard.js';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard.js';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateServiceDto } from '@services/dto/create-service.dto.js';
import { ServiceQueryDto } from '@services/dto/ervice-query.dto.js';
import { UpdateServiceDto } from '@services/dto/update-service.dto.js';
import type { IServicesService } from '@services/interfaces/services.service.interface.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { SERVICE_MESSAGES } from '../../constants/message.constant.js';

@Controller('services')
export class ServicesController {
  constructor(
    @Inject('IServicesService')
    private readonly _servicesService: IServicesService,
  ) {}
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CreateServiceDto,
    @UploadedFile()
    image?: {
      buffer: Buffer;
      mimetype: string;
    },
  ) {
    return await this._servicesService.create(dto, image);
  }
  @Get()
  async search(@Query() query: ServiceQueryDto) {
    return await this._servicesService.search(query);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceDto,
    @UploadedFile()
    image?: {
      buffer: Buffer;
      mimetype: string;
    },
  ) {
    return await this._servicesService.update(id, dto, image);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async delete(@Param('id') id: string) {
    await this._servicesService.delete(id);

    return {
      message: SERVICE_MESSAGES.SERVICE_DELETED,
    };
  }
}
