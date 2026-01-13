import { Op, Sequelize } from "sequelize";
import { ModelStatus } from "../../../../share/model/base-model.js";
import type { PagingDTO } from "../../../../share/model/paging.js";
import type { IRepository } from "../../interface/index.js";
import type { CategoryCondDTO, CategoryUpdateDTO } from "../../model/dto.js";
import type { Category } from "../../model/model.js";

// implement ORM here (Sequelize)

export class MySQLCategoryRepository implements IRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly modelName: string
  ) {}

  private get model() {
    const model = this.sequelize.models[this.modelName];
    if (!model) {
      throw new Error(`Model ${this.modelName} not found`);
    }
    return model;
  }
  async get(id: string): Promise<Category | null> {
    const data = await this.model.findByPk(id);

    if (!data) {
      return null;
    }

    return data.get({ plain: true }) as Category;
  }

  async list(
    cond: CategoryCondDTO,
    paging: PagingDTO
  ): Promise<Array<Category>> {
    const { page, limit } = paging;

    const condSQL = { ...cond, status: { [Op.ne]: ModelStatus.DELETED } };

    const total = await this.model.count({
      where: condSQL,
    });
    paging.total = total;
    const rows = await this.model.findAll({
      where: condSQL,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });
    return rows.map((row) => row.get({ plain: true }));
  }

  async insert(data: Category): Promise<boolean> {
    await this.model.create(data);
    return true;
  }
  async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
    await this.model.update(data, { where: { id } });
    return true;
  }
  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    if (!isHard) {
      await this.model.update(
        { status: ModelStatus.DELETED },
        { where: { id } }
      );
    } else {
      await this.model.destroy({ where: { id } });
    }
    return true;
  }
}

