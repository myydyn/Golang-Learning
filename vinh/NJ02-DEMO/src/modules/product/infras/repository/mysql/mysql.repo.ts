import { BaseRepositorySequelize, BaseQueryRepositorySequelize, BaseCommandRepositorySequelize } from "@share/repository/repo-sequelize";
import { Product } from "@modules/product/model/product";
import { ProductConditionDTO, ProductUpdateDTO } from "@modules/product/model/dto";
import { Sequelize } from "sequelize";

export class MySQLProductRepository extends BaseRepositorySequelize<Product, ProductConditionDTO, ProductUpdateDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(
            new MYSQLProductQueryRepository(sequelize, modelName),
            new MYSQLProductCommandRepository(sequelize, modelName));
    }
}

export class MYSQLProductQueryRepository extends BaseQueryRepositorySequelize<Product, ProductConditionDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(sequelize, modelName);
    }
}

export class MYSQLProductCommandRepository extends BaseCommandRepositorySequelize<Product, ProductConditionDTO, ProductUpdateDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(sequelize, modelName);
    }
}