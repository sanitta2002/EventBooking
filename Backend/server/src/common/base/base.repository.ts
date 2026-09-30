import { Model, QueryFilter, UpdateQuery } from "mongoose";
import { IBaseRepository } from "./base.repository.interface.js";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
    constructor(protected readonly _Model:Model<T>){}
    async create(data: Partial<T>): Promise<T> {
        return await this._Model.create(data);
    }
    async findById(id: string): Promise<T | null> {
        return await this._Model.findById(id).exec()
    }
    async updateById(id: string, data: UpdateQuery<T>): Promise<T | null>  {
        return await this._Model.findByIdAndUpdate(id,data,{new : true})
    }
    async deleteById(id: string): Promise<boolean | null> {
        return await this._Model.findByIdAndDelete(id)
        
    }
}