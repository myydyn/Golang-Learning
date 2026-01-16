import { CreateCommend, UpdateCommend, DeleteCommend, ListQuery, GetDetailQuery } from "../../interface";
import { Request, Response } from "express";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { Brand } from "../../model/brand";
import { ICommandHandler, IQueryHandler } from "../../../../share/interface";

export class BrandHttpService {
    constructor(
        private readonly CreateCmdHandler: ICommandHandler<CreateCommend, string>,
        private readonly GetDetailQueryHandler: IQueryHandler<GetDetailQuery, Brand>, 
        private readonly UpdateCmdHandler: ICommandHandler<UpdateCommend, void>,
        private readonly DeleteCmdHandler: ICommandHandler<DeleteCommend, void>,
        private readonly ListQueryHandler: IQueryHandler<ListQuery, Brand[]>,
    ) {}

    async createAPI(req: Request, res: Response) {
        try {
            const cmd: CreateCommend = {dto: req.body};
            const result = await this.CreateCmdHandler.execute(cmd);
            res.status(201).json({data: result});
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message,
            });
        }
    }

    async getDetailAPI(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await this.GetDetailQueryHandler.query({id});
            res.status(200).json({data: result});
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message,
            });
        }
    }

    async updateAPI(req: Request, res: Response) {
        const { id } = req.params;
        const cmd: UpdateCommend = {id, dto: req.body};

        const result = await this.UpdateCmdHandler.execute(cmd);
        res.status(200).json({data: true});
    }

    async deleteAPI(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await this.DeleteCmdHandler.execute({id, isHardDelete: false});
            res.status(200).json({data: true});
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message,
            });
        }
    }

    async listAPI(req: Request, res: Response) {
        const {success, data: paging, error} = PagingDTOSchema.safeParse(req.query);

        if (!success) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }

        const result = await this.ListQueryHandler.query({cond: {}, paging});

        res.status(200).json({data: result, paging, filter: {}});   
    }
}


