import { IProductUseCase, IBrandQueryRepository, ICategoryQueryRepository } from "../interface";
import { IRepository } from "@share/interface";
import { Product, ProductGender } from "../model/product";
import { ModelStatus } from "@share/model/base-model";
import { v7 } from "uuid";
import { ProductConditionDTO, ProductCreateDTO, ProductUpdateDTO, ProductConditionSchema, ProductCreateSchema, ProductUpdateSchema } from "../model/dto";
import { PagingDTO } from "@share/model/paging";
import { ErrDataNotFound } from "@share/model/base-error";
import { ErrBrandNotFound, ErrCategoryNotFound } from "../model/errors";


export class ProductUseCase implements IProductUseCase {
    constructor(
        private readonly repository: IRepository<Product, ProductConditionDTO, ProductUpdateDTO>,
        private readonly productBrandRepository: IBrandQueryRepository,
        private readonly productCategoryRepository: ICategoryQueryRepository,
    ) {}

    async create(data: ProductCreateDTO): Promise<string> {
        const dto = ProductCreateSchema.parse(data);

        if (dto.brandId) {
            const brand = await this.productBrandRepository.get(dto.brandId);
            if (!brand) {
                throw new Error(ErrBrandNotFound);
            }
        }

        if (dto.categoryId) {
            const category = await this.productCategoryRepository.get(dto.categoryId);
            if (!category) {
                throw new Error(ErrCategoryNotFound);
            }
        }
        
        const newId = v7();
        const newProduct: Product = {
            ...dto,
            id: newId,  
            status: ModelStatus.ACTIVE,
            rating: 0,
            saleCount: 0,
            gender: ProductGender.UNISEX,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.repository.insert(newProduct);
        
        return newId;
    }

    async getDetail(id: string): Promise<Product | null> {
        const data = await this.repository.get(id);
        if (!data || data.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }
        return data;
    }

    async update(id: string, data: ProductUpdateDTO): Promise<boolean> {
        const dto = ProductUpdateSchema.parse(data);

        const product = await this.repository.get(id);

        if (!product || product.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }

        await this.repository.update(id, dto);
        return true;
    }

    async list(cond: ProductConditionDTO, paging: PagingDTO): Promise<Product[]> {
        const parseCond = ProductConditionSchema.parse(cond);

        return await this.repository.list(parseCond, paging);
    }
    
    async delete(id: string): Promise<boolean> {
        const product = await this.repository.get(id);

        if (!product || product.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }

        await this.repository.delete(id, false);
        return true;
    }
}