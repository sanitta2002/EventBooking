import { User } from "@users/schemas/user.schema.js";
import { BaseRepository } from "@common/base/base.repository.js";
import type { IUserRepository } from "@users/interfaces/user.repository.interface.js";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
     constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }
  async findByEmail(email: string): Promise<User | null> {
      return await this._Model.findOne({ email }).exec();
  }
  
}