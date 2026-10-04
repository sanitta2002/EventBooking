import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard.js';
import { AdminGuard } from '@common/guards/admin.guard.js';
import { UsersService } from '../service/users.service.js';

@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard)
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this._usersService.findAll();
  }
}
