import { ListQuery } from "../interface";
import { IQueryHandler } from "../../../share/interface";
import { Brand } from "../model/brand";
import { IQueryRepository } from "../../../share/interface";
import { BrandConditionDTO } from "../model/dto";

export class ListBrandQuery implements IQueryHandler<ListQuery, Brand[]> {
    constructor(private readonly repository: IQueryRepository<Brand, BrandConditionDTO>) {}

    async query(query: ListQuery): Promise<Brand[]> {
        const collection = await this.repository.list(query.cond, query.paging);

        return collection;
    }
}   