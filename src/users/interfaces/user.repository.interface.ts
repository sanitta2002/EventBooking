import type { IBaseRepository } from '@common/base/base.repository.interface.js';
import type { User, UserDocument } from '@users/schemas/user.schema.js';


export interface IUserRepository extends IBaseRepository<User> {
 findByEmail(email: string): Promise<User | null>;
}