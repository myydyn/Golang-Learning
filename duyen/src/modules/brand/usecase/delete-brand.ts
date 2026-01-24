import type { ICommandHandler } from "../../../share/interface/index.js";
import { ErrDataNotFound } from "../../../share/model/base-error.js";
import { ModelStatus } from "../../../share/model/base-model.js";
import type { DeleteCommand, IBrandRepository } from "../interface/index.js";

export class DeleteBrandCmdHandler implements ICommandHandler<
  DeleteCommand,
  void
> {
  constructor(private readonly repository: IBrandRepository) {}

  async execute(command: DeleteCommand): Promise<void> {
    const data = await this.repository.get(command.id);

    if (!data || data.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    await this.repository.delete(command.id, command.isHardDelete);

    return;
  }
}
