import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import type { IJWTService } from '@auth/interfaces/jwt.service.interface.js';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

@Injectable()
export class JwtService implements IJWTService {
  constructor(
    private readonly _jwtService: NestJwtService,
    private readonly configService: ConfigService
  ) {}

  generateAccessToken(payload: {
    userId: string;
    email: string;
    role: string;
  }): string {
    return this._jwtService.sign(payload);
  }

  generateRefreshToken(payload: { userId: string }): string {
    return this._jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: (this.configService.get<StringValue>('JWT_REFRESH_EXPIRES_IN') ?? '7d'),
    });
  }
  verifyRefreshToken(refreshToken: string): { userId: string; } {
      return this._jwtService.verify(refreshToken, {
    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
  }) as {
    userId: string;
  };
  }
}