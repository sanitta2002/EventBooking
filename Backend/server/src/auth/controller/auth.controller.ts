import { LoginDto } from '@auth/dto/login.dto.js';
import { RefreshTokenDto } from '@auth/dto/RefreshTokenDto.js';
import { RegisterDto } from '@auth/dto/register.dto.js';
import type { IAuthService } from '@auth/interfaces/auth.service.interface.js';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly _authService: IAuthService,
  ) {}
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this._authService.register(dto);
  }
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this._authService.login(dto);
  }
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return await this._authService.refresh(dto);
  }
}
