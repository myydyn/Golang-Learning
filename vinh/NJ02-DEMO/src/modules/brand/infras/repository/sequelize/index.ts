import { Sequelize } from "sequelize";
import { BaseRepositorySequelize, BaseQueryRepositorySequelize, BaseCommandRepositorySequelize } from "@share/repository/repo-sequelize";
import { Brand } from "@modules/brand/model/brand";
import { BrandUpdateDTO, BrandConditionDTO } from "@modules/brand/model/dto";
import { modelName } from "./dto";

export class MySQLBrandRepository extends BaseRepositorySequelize<Brand, BrandConditionDTO, BrandUpdateDTO> {
    constructor(readonly sequelize: Sequelize) {
        super(
            new MySQLBrandQueryRepository(sequelize, modelName),
            new MySQLBrandCommandRepository(sequelize, modelName)
        );
    }
}

export class MySQLBrandQueryRepository extends BaseQueryRepositorySequelize<Brand, BrandConditionDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(sequelize, modelName);
    }
}

export class MySQLBrandCommandRepository extends BaseCommandRepositorySequelize<Brand, BrandConditionDTO, BrandUpdateDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(sequelize, modelName);
    }
}