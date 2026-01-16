import { Brand } from "../model/brand";
import { PagingDTO } from "../../../share/model/paging";
import { BrandConditionDTO } from "../model/dto";
import { BrandUpdateDTO } from "../model/dto";
import { BrandCreateDTO } from "../model/dto";
import { IRepository } from "../../../share/interface";

export interface IBrandUseCase {
    create(data: BrandCreateDTO): Promise<string>;
    getDetail(id: string): Promise<Brand | null>;
    list(query: ListQuery): Promise<Brand[] | null>;
    update(id: string, data: BrandUpdateDTO): Promise<boolean>;
    delete(id: string): Promise<boolean>;   
};

export interface CreateCommend {
    dto: BrandCreateDTO;
}

export interface GetDetailQuery {
    id: string;
}

export interface UpdateCommend {
    id: string;
    dto: BrandUpdateDTO;
}

export interface DeleteCommend {
    id: string;
    isHardDelete: boolean;
}

export interface ListQuery {
    cond: BrandConditionDTO;
    paging: PagingDTO;
}

export interface IBrandRepository extends IRepository<Brand, BrandConditionDTO, BrandUpdateDTO> {}
