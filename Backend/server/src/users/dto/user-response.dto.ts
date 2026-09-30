import { Role } from '@common/enums/role.enum.js';

export class UserResponseDTO {
  name: string;
  email: string;
  role: Role;
}