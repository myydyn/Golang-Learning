import { PagingDTO } from "../model/paging";
import { ModelStatus } from "../model/base-model";
import { Op, Sequelize } from "sequelize";
import { IQueryRepository, ICommandRepository, IRepository } from "../interface";

export abstract class BaseRepositorySequelize <Entity, Condition, UpdateDTO> implements IRepository<Entity, Condition, UpdateDTO> {
    constructor(
        readonly queryRepo: IQueryRepository<Entity, Condition>,
        readonly cmdRepo: ICommandRepository<Entity, UpdateDTO>
    ) {}
    
    async get(id: string): Promise<Entity | null> {
        return await this.queryRepo.get(id);
    }
    
    async findByCondition(cond: Condition): Promise<Entity | null> {
        return await this.queryRepo.findByCondition(cond);
    }

    async list(cond: Condition, paging: PagingDTO): Promise<Entity[]> {
        return await this.queryRepo.list(cond, paging);
    }

    async insert(data: Entity): Promise<boolean> {
        return await this.cmdRepo.insert(data);
    }

    async update(id: string, data: UpdateDTO): Promise<boolean> {
        return await this.cmdRepo.update(id, data);
    }

    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        return await this.cmdRepo.delete(id, isHard);
    }   
}

export abstract class BaseQueryRepositorySequelize <Entity, Condition> implements IQueryRepository<Entity, Condition> {
    constructor (
        readonly sequelize: Sequelize,
        readonly modelName: string
    ) {}

    async get(id: string): Promise<Entity | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id);
        if (!data) {
            return null;
        }
            
        const persistenceData = data.get({plain: true});
        const { created_at, updated_at, ...props } = persistenceData;

        return {
            ...props,
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
}

export abstract class BaseCommandRepositorySequelize <Entity, Condition, UpdateDTO> implements ICommandRepository<Entity, UpdateDTO> {
    constructor(
        readonly sequelize: Sequelize,
        readonly modelName: string
    ) {}
    
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
