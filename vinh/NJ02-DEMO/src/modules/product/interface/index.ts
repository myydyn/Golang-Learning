import { IUseCase } from "@share/interface";
import { ProductCreateDTO, ProductUpdateDTO, ProductConditionDTO } from "../model/dto";
import { Product } from "../model/product";
import { ProductBrand, ProductCategory } from "../model/product";
// IUseCase<Entity, CreateDTO, UpdateDTO, Condition>
export interface IProductUseCase extends IUseCase<Product, ProductCreateDTO, ProductUpdateDTO, ProductConditionDTO> {

}

export interface IBrandQueryRepository {
    get(id:string):Promise<ProductBrand | null>
}

export interface ICategoryQueryRepository {
    get(id:string):Promise<ProductCategory | null>
}
