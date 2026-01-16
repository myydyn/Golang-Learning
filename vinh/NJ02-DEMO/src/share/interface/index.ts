import { PagingDTO } from "../model/paging";


export interface IRepository <Entity, Condition, UpdateDTO> extends IQueryRepository<Entity, Condition>, ICommentRepository<Entity, UpdateDTO> {};

export interface IQueryRepository <Entity, Condition> {
    get(id: string): Promise<Entity | null>;
    findByCondition(cond: Condition): Promise<Entity | null>;
    list(cond: Condition, paging: PagingDTO): Promise<Entity[]>;
};

export interface ICommentRepository <Entity, UpdateDTO> {
    insert(data: Entity): Promise<boolean>;
    update(id: string, data: UpdateDTO): Promise<boolean>;
    delete(id: string, isHard: boolean): Promise<boolean>;
}

export interface ICommandHandler <Cmd, Result>{
    execute(command: Cmd): Promise<Result>;
}

export interface IQueryHandler <Query, Result>{
    query(query: Query): Promise<Result>;
}