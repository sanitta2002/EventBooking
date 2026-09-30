import { QueryFilter, UpdateQuery } from "mongoose";

export interface IBaseRepository<T>{
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null> ;
  updateById(id: string, data: UpdateQuery<T>): Promise<T | null>;
  deleteById(id: string): Promise<boolean | null>;
}