import { Op, Sequelize } from "sequelize";
import type { IRepository } from "../interface/index.js";
import { ModelStatus } from "../model/base-model.js";
import type { PagingDTO } from "../model/paging.js";

export abstract class BaseRepositorySequelize<
  Entity,
  Cond,
  UpdateDTO,
> implements IRepository<Entity, Cond, UpdateDTO> {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly modelName: string,
  ) {}

  /**
   * Safely get the Sequelize model by name
   * @throws Error if the model is not registered
   */
  private getModel() {
    const model = this.sequelize.models[this.modelName];
    if (!model) {
      throw new Error(
        `Model "${this.modelName}" is not registered in Sequelize`,
      );
    }
    return model;
  }

  async get(id: string): Promise<Entity | null> {
    const data = await this.getModel().findByPk(id);

    if (!data) {
      return null;
    }

    const persistenceData = data.get({ plain: true });
    const { created_at, updated_at, ...props } = persistenceData;

    return {
      ...props,
      createdAt: persistenceData.created_at,
      updatedAt: persistenceData.updated_at,
    } as Entity;
  }

  async findByCond(cond: Cond): Promise<Entity | null> {
    const data = await this.getModel().findOne({
      where: cond as any,
    });

    if (!data) {
      return null;
    }

    const persistenceData = data.get({ plain: true });
    return persistenceData as Entity;
  }

  async list(cond: Cond, paging: PagingDTO): Promise<Array<Entity>> {
    const { page, limit } = paging;

    const condSQL = { ...cond, status: { [Op.ne]: ModelStatus.DELETED } };

    const total = await this.getModel().count({
      where: condSQL,
    });
    paging.total = total;

    const rows = await this.getModel().findAll({
      where: condSQL,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });

    return rows.map((row) => row.get({ plain: true }));
  }

  async insert(data: Entity): Promise<boolean> {
    await this.getModel().create(data as any);
    return true;
  }

  async update(id: string, data: UpdateDTO): Promise<boolean> {
    await this.getModel().update(data as any, {
      where: { id },
    });
    return true;
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    if (!isHard) {
      await this.getModel().update(
        { status: ModelStatus.DELETED },
        { where: { id } },
      );
    } else {
      await this.getModel().destroy({ where: { id } });
    }

    return true;
  }
}
