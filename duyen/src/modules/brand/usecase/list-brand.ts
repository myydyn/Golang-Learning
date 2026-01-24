import type {
  IQueryHandler,
  IQueryRepository,
} from "../../../share/interface/index.js";
import type { ListQuery } from "../interface/index.js";
import type { Brand } from "../model/brand.js";
import type { BrandCondDTO } from "../model/dto.js";

export class ListBrandQuery implements IQueryHandler<ListQuery, Brand[]> {
  constructor(
    private readonly repository: IQueryRepository<Brand, BrandCondDTO>,
  ) {}

  async query(query: ListQuery): Promise<Brand[]> {
    const collection = await this.repository.list(query.cond, query.paging);
    return collection;
  }
}
