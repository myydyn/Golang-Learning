import { Sequelize } from "sequelize";
import { BaseRepositorySequelize } from "../../../../../share/repository/repo-sequelize";
import { Brand } from "../../../model/brand";
import { BrandUpdateDTO, BrandConditionDTO } from "../../../model/dto";
import { modelName } from "./dto";

export class MySQLBrandRepository extends BaseRepositorySequelize<Brand, BrandConditionDTO, BrandUpdateDTO> {
    constructor(sequelize: Sequelize) {
        super(sequelize, modelName);
    }
}