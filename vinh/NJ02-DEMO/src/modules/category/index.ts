import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { Sequelize } from "sequelize";
import { MySQLCategoryRepository } from "./infras/repository/repo";
import { CategoryUseCase } from "./usecase";
import { CategoryHttpService } from "./infras/transport/http-service";

export const setupCategoryHexagon = (sequelize: Sequelize) => {
    init(sequelize);    
    
    const repository = new MySQLCategoryRepository(sequelize, modelName)
    const useCase = new CategoryUseCase(repository)
    const httpService = new CategoryHttpService(useCase)

    const router = Router();
    
    router.post('/categories', httpService.createANewCategoryAPI.bind(httpService));
    router.get('/categories/:id', httpService.getDetailCategoryAPI.bind(httpService));
    router.get('/categories', httpService.listCategoryAPI.bind(httpService));
    router.patch('/categories/:id', httpService.updateCategoryAPI.bind(httpService));
    router.delete('/categories/:id', httpService.deleteCategoryAPI.bind(httpService));

    return router;
};