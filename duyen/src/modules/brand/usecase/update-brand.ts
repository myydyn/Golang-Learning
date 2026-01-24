import type { ICommandHandler } from "../../../share/interface/index.js";
import { ErrDataNotFound } from "../../../share/model/base-error.js";
import { ModelStatus } from "../../../share/model/base-model.js";
import type { IBrandRepository, UpdateCommand } from "../interface/index.js";
import { BrandUpdateDTOSchema } from "../model/dto.js";

export class UpdateBrandCmdHandler implements ICommandHandler<
  UpdateCommand,
  void
> {
  constructor(private readonly repository: IBrandRepository) {}

  async execute(command: UpdateCommand): Promise<void> {
    const {
      success,
      data: parsedData,
      error,
    } = BrandUpdateDTOSchema.safeParse(command.dto);

    if (!success) {
      throw new Error("Invalid data");
    }

    const data = await this.repository.get(command.id);

    if (!data || data.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    await this.repository.update(command.id, parsedData);

    return;
  }
}
