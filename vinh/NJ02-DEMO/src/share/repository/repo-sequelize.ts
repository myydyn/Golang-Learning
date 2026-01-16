import { IRepository } from "../interface";
import { Sequelize } from "sequelize";
import { PagingDTO } from "../model/paging";
import { ModelStatus } from "../model/base-model";
import { Op } from "sequelize";

export abstract class BaseRepositorySequelize <Entity, Condition, UpdateDTO> implements IRepository<Entity, Condition, UpdateDTO> {
    constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {}
    
    async get(id: string): Promise<Entity | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id);
        if (!data) {
            return null;
        }
        
        const persistenceData = data.get({plain: true});
        return {
            ...persistenceData,
            createdAt: persistenceData.created_at,
            updatedAt: persistenceData.updated_at,
        } as Entity;
    }
    
    async findByCondition(cond: Condition): Promise<Entity | null> {
        const data = await this.sequelize.models[this.modelName].findOne({where: cond as any});
        if (!data) {
            return null;
        }
        
        const persistenceData = data.get({plain: true});
        return persistenceData as Entity;
    }

    async list(cond: Condition, paging: PagingDTO): Promise<Entity[]> {
        const {page, limit} = paging;
        const condSQL = {...cond, status: {[Op.ne]: ModelStatus.DELETED}};

        const total = await this.sequelize.models[this.modelName].count({where: condSQL});
        paging.total = total;

        const rows = await this.sequelize.models[this.modelName].findAll({where: condSQL, limit, offset: (page - 1) * limit});
        return rows.map(row => row.get({plain: true}) as Entity);
    }

    async insert(data: Entity): Promise<boolean> {
        await this.sequelize.models[this.modelName].create(data as any);
        return true;
    }

    async update(id: string, data: UpdateDTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data as any, {where: {id}});
        return true;
    }

    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        if (!isHard) {
            await this.sequelize.models[this.modelName].update({status: ModelStatus.DELETED}, {where: {id}});
            return true;
        } else {
            await this.sequelize.models[this.modelName].destroy({where: {id}});
        }
        return true;
    }
}
