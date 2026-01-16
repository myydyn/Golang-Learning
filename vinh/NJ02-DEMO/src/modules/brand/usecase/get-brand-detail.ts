import { GetDetailQuery } from "../interface";
import { IQueryHandler } from "../../../share/interface";
import { Brand } from "../model/brand";
import { IQueryRepository } from "../../../share/interface";
import { BrandConditionDTO } from "../model/dto";
import { ErrDataNotFound } from "../../../share/model/base-error";

export class GetBrandDetailUseCase implements IQueryHandler<GetDetailQuery, Brand> {
    constructor(private readonly repository: IQueryRepository<Brand, BrandConditionDTO>) {}

    async query(query: GetDetailQuery): Promise<Brand> {
        const data = await this.repository.get(query.id);

        if (!data) {
            throw ErrDataNotFound;
        }

        return data;
    }
}   