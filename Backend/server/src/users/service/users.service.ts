import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../interfaces/user.repository.interface.js';
import type { User } from '../schemas/user.schema.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly _userRepository: IUserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this._userRepository.findAll();
  }
}
