import { User } from '@users/schemas/user.schema.js';
import { UserResponseDTO } from '@users/dto/user-response.dto.js';

export class UserMapper {
  static toResponse(user: User): UserResponseDTO {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}