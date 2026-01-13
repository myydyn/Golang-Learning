import { Request, Response } from "express";
import { CategoryCondiDTOSchema, CategoryCreateSchema, CategoryUpdateSchema } from "../../model/dto";
import { ICategoryUseCase } from "../../interface";
import { PagingDTOSchema } from "../../../../share/model/paging";

export class CategoryHttpService {
    constructor(private readonly useCase: ICategoryUseCase) {}

    async createANewCategoryAPI(req: Request, res: Response) {
        const { success, data, error} = CategoryCreateSchema.safeParse(req.body);

    if (!success) {
        res.status(400).json({
            message: error.message,
        });
        return;
    }

        const result = await this.useCase.createANewCategory(data);
        res.status(201).json({data: result});
    }

    async getDetailCategoryAPI(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.useCase.getDetailCategory(id);
        res.status(200).json({data: result});
    }

    async updateCategoryAPI(req: Request, res: Response) {
        const { id } = req.params;

        const {success, data, error} = CategoryUpdateSchema.safeParse(req.body);

        if (!success) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }

        const result = await this.useCase.updateCategory(id, data);
        res.status(200).json({data: result});
    }

    async deleteCategoryAPI(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.useCase.deleteCategory(id);
        res.status(200).json({data: result});
    }

    async listCategoryAPI(req: Request, res: Response) {
        const {success, data: paging, error} = PagingDTOSchema.safeParse(req.query);

        if (!success) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }

        const cond = CategoryCondiDTOSchema.parse(req.query);

        const result = await this.useCase.listCategories(cond, paging);
        res.status(200).json({data: result, paging, filter: cond});   
    }

}


