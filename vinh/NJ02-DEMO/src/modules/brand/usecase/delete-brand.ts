import { ICommandHandler } from "../../../share/interface";
import { DeleteCommend } from "../interface";
import { ModelStatus } from "../../../share/model/base-model";
import { IBrandRepository } from "../interface";
import { ErrDataNotFound } from "../../../share/model/base-error";

export class DeleteBrandCmdHandler implements ICommandHandler<DeleteCommend, void> {
    constructor(private readonly repository: IBrandRepository) {}
        
    async execute(command: DeleteCommend): Promise<void> {
        const data = await this.repository.get(command.id);
    
        if(!data || data.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }
        
        await this.repository.delete(command.id, command.isHardDelete);
        
        return;
    };
}