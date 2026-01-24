import { ZodError } from "zod";
import { v7 } from "uuid";
import { ErrDataNotFound } from "../../../share/model/base-error.js";
import { ModelStatus } from "../../../share/model/base-model.js";
import type { PagingDTO } from "../../../share/model/paging.js";
import type { ICategoryUseCase, IRepository } from "../interface/index.js";
import { CategoryCreateSchema } from "../model/dto.js";
import type {
  CategoryCondDTO,
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from "../model/dto.js";
import { ErrCategoryNameTooShort } from "../model/errors.js";
import type { Category } from "../model/model.js";

export class CategoryUseCase implements ICategoryUseCase {
  constructor(private readonly repository: IRepository) {}

  async createANewCategory(data: CategoryCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = CategoryCreateSchema.safeParse(data);

    if (error) {
      // TODO: process error
      const issues = (error as ZodError).issues;

      for (const issue of issues) {
        if (issue.path[0] === "name") {
          throw ErrCategoryNameTooShort;
        }
      }

      throw error;
    }

    const newId = v7();

    const category: Category = {
      id: newId,
      name: parsedData!.name,
      position: 0,
      image: parsedData!.image,
      description: parsedData!.description,
      status: ModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.insert(category);

    return newId;
  }

  async getDetailCategory(id: string): Promise<Category | null> {
    const data = await this.repository.get(id);

    if (!data || data.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return data;
  }

  async listCategories(
    cond: CategoryCondDTO,
    paging: PagingDTO
  ): Promise<Array<Category>> {
    const data = await this.repository.list(cond, paging);

    return data;
  }

  async updateCategory(id: string, data: CategoryUpdateDTO): Promise<boolean> {
    const category = await this.repository.get(id);

    if (!category || category.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.update(id, data);
  }

  async deleteCategory(id: string): Promise<boolean> {
    const category = await this.repository.get(id);

    if (!category || category.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, false);
  }
}
