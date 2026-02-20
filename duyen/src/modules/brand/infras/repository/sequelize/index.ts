import { Sequelize } from "sequelize";
import { BaseRepositorySequelize } from "../../../../../share/repository/repo-sequelize.js";
import type { Brand } from "../../../model/brand.js";
import type { BrandCondDTO, BrandUpdateDTO } from "../../../model/dto.js";
import { modelName } from "./dto.js";

export class MySQLBrandRespository extends BaseRepositorySequelize<Brand, BrandCondDTO, BrandUpdateDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}
