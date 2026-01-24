import { v7 } from "uuid";
import type { ICommandHandler } from "../../../share/interface/index.js";
import { ModelStatus } from "../../../share/model/base-model.js";
import type { CreateCommand, IBrandRepository } from "../interface/index.js";
import { BrandCreateDTOSchema } from "../model/dto.js";
import { ErrBrandNameDuplicate } from "../model/errors.js";

export class CreateNewBrandCmdHandler implements ICommandHandler<CreateCommand, string> {
  constructor(private readonly repository: IBrandRepository) { }

  async execute(command: CreateCommand): Promise<string> {
    const { success, data: parsedData, error } = BrandCreateDTOSchema.safeParse(command.dto);

    if (!success) {
      throw new Error('Invalid data');
    }

    const isExist = await this.repository.findByCond({ name: parsedData.name });

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
    };

    await this.repository.insert(newBrand);

    return newId;
  }
}
