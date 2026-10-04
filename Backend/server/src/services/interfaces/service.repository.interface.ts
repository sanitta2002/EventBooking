import { IBaseRepository } from "@common/base/base.repository.interface.js";
import { ServiceCategory } from "@common/types/ServiceCategory.js";
import { ServiceQueryDto } from "@services/dto/ervice-query.dto.js";
import { Service } from "@services/schemas/service.schema.js";

export interface IServiceRepository extends IBaseRepository<Service> {
    search(query: ServiceQueryDto): Promise<Service[]>;
    findByTitleAndCategory(
  title: string,
  category: ServiceCategory,
): Promise<Service | null>;
}