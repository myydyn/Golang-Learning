import { ICommandHandler } from "../../../share/interface";
import { UpdateCommend } from "../interface";
import { BrandUpdateDTOSchema } from "../model/dto";
import { ModelStatus } from "../../../share/model/base-model";
import { IBrandRepository } from "../interface";
import { ErrDataNotFound } from "../../../share/model/base-error";

export class UpdateBrandCmdHandler implements ICommandHandler<UpdateCommend, void> {
    constructor(private readonly repository: IBrandRepository) {}
        
    async execute(command: UpdateCommend): Promise<void> {
        const { success, data: parsedData, error } = BrandUpdateDTOSchema.safeParse(command.dto);
        
        if (!success) {
            throw error;
        }
        
        const data = await this.repository.get(command.id);
        
        if(!data || data.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }
        
        await this.repository.update(command.id, parsedData);
        
        return;
    };
}