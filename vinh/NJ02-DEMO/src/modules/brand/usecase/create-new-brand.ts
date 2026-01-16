import { ICommandHandler } from "../../../share/interface";
import { CreateCommend } from "../interface";
import { BrandCreateDTOSchema } from "../model/dto";
import { ErrBrandNameDuplicate } from "../model/errors";
import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { IBrandRepository } from "../interface";

export class CreateNewBrandCmdHandler implements ICommandHandler<CreateCommend, string> {
    constructor(private readonly repository: IBrandRepository) {}

    async execute(command: CreateCommend): Promise<string> {
        const { success, data: parsedData, error } = BrandCreateDTOSchema.safeParse(command.dto);
        
        if (!success) {
            throw error;
        }
        
        const isExist = await this.repository.findByCondition({name: parsedData.name});
        if (isExist) {
            throw ErrBrandNameDuplicate;
        }

        const newId = v7();

        const newBrand = {
            ...parsedData,
            id: newId,
            status: ModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.repository.insert(newBrand);

        return newId;
    }
}