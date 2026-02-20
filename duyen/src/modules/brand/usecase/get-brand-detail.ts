import type {
  IQueryHandler,
  IQueryRepository,
} from "../../../share/interface/index.js";
import { ErrDataNotFound } from "../../../share/model/base-error.js";
import type { GetDetailQuery } from "../interface/index.js";
import type { Brand } from "../model/brand.js";
import type { BrandCondDTO } from "../model/dto.js";

export class GetBrandDetailQuery implements IQueryHandler<
  GetDetailQuery,
  Brand
> {
  constructor(
    private readonly repository: IQueryRepository<Brand, BrandCondDTO>,
  ) {}

  async query(query: GetDetailQuery): Promise<Brand> {
    const data = await this.repository.get(query.id);

    if (!data) {
      throw ErrDataNotFound;
    }

    return data;
  }
}
