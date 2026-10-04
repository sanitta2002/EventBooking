import type { IBaseRepository } from '@common/base/base.repository.interface.js';
import type { User } from '@users/schemas/user.schema.js';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}