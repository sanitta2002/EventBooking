import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import type { IJWTService } from '@auth/interfaces/jwt.service.interface.js';

@Injectable()
export class JwtService implements IJWTService {
  constructor(private readonly _jwtService: NestJwtService) {}

  generateAccessToken(payload: {
    userId: string;
    email: string;
    role: string;
  }): string {
    return this._jwtService.sign(payload);
  }

  generateRefreshToken(payload: { userId: string }): string {
    return this._jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }
  verifyRefreshToken(refreshToken: string): { userId: string; } {
      return this._jwtService.verify(refreshToken, {
    secret: process.env.JWT_REFRESH_SECRET,
  }) as {
    userId: string;
  };
  }
}