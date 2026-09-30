import { LoginDto } from "@auth/dto/login.dto.js";
import { UserResponseDTO } from "@users/dto/user-response.dto.js";
import { RegisterDto } from "@auth/dto/register.dto.js";
import { RefreshTokenDto } from "@auth/dto/RefreshTokenDto.js";

export interface IAuthService {
  register(dto: RegisterDto): Promise<UserResponseDTO>;

  login(dto: LoginDto): Promise<{
    accessToken: string;
     refreshToken: string;
    user: UserResponseDTO;
  }>;
  refresh(dto: RefreshTokenDto): Promise<{
  accessToken: string;
}>;
}
