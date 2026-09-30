import { JwtAuthGuard } from '@common/guards/jwt-auth.guard.js';
import { Controller, UseGuards } from '@nestjs/common';
@UseGuards(JwtAuthGuard)
@Controller('services')
export class ServicesController {}
