import type { IUserRepository } from '@users/interfaces/user.repository.interface.js';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthService } from '@auth/interfaces/auth.service.interface.js';
import { RegisterDto } from '@auth/dto/register.dto.js';
import { UserResponseDTO } from '@users/dto/user-response.dto.js';
import { AUTH_MESSAGES } from '../../constants/message.constant.js';
import * as bcrypt from 'bcrypt';
import { UserMapper } from '@users/mappers/user.mapper.js';
import { LoginDto } from '@auth/dto/login.dto.js';
import type { IJWTService } from '@auth/interfaces/jwt.service.interface.js';
import { RefreshTokenDto } from '@auth/dto/RefreshTokenDto.js';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly _userRepository: IUserRepository,
    @Inject('IJWTService')
    private readonly _jwtService: IJWTService,
  ) {}
  async register(dto: RegisterDto): Promise<UserResponseDTO> {
    const existingUser = await this._userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException(AUTH_MESSAGES.USER_ALREADY_EXISTS);
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this._userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });
    return UserMapper.toResponse(user);
  }
  async login(
    dto: LoginDto,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponseDTO;
  }> {
    const user = await this._userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }
    const accessToken = this._jwtService.generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    const refreshToken = this._jwtService.generateRefreshToken({
      userId: user._id.toString(),
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: UserMapper.toResponse(user),
    };
  }
  async refresh(dto: RefreshTokenDto): Promise<{ accessToken: string }> {
    const payload = this._jwtService.verifyRefreshToken(dto.refreshToken);

    const user = await this._userRepository.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const accessToken = this._jwtService.generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
    };
  }
}
