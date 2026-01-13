import { Category } from "../model/model";
import { PagingDTO } from "../../../share/model/paging";
import { CategoryCondiDTO } from "../model/dto";
import { CategoryUpdateDTO } from "../model/dto";
import { CategoryCreateDTO } from "../model/dto";

export interface ICategoryUseCase {
    createANewCategory(data: CategoryCreateDTO): Promise<string>;
    getDetailCategory(id: string): Promise<Category | null>;
    listCategories(cond: CategoryCondiDTO, paging: PagingDTO): Promise<Category[] | null>;
    updateCategory(id: string, data: CategoryUpdateDTO): Promise<boolean>;
    deleteCategory(id: string): Promise<boolean>;   
};

export interface IRepository extends ICommentRepository, IQueryRepository {};

export interface IQueryRepository {
    get(id: string): Promise<Category | null>;
    list(cond: CategoryCondiDTO, paging: PagingDTO): Promise<Category[]>;
};

export interface ICommentRepository {
    insert(data: Category): Promise<boolean>;
    update(id: string, data: CategoryUpdateDTO): Promise<boolean>;
    delete(id: string, isHard: boolean): Promise<boolean>;
}