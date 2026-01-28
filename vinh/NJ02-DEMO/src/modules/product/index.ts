import { Router } from "express";
import { Sequelize } from "sequelize";
import { init, modelName } from "./infras/repository/mysql/dto";
import { MySQLProductRepository } from "./infras/repository/mysql/mysql.repo";
import { ProductUseCase } from "./usecase";
import { ProductHttpService } from "./infras/transport/http-service";
import { config } from "@share/component/config";
import { ProxyProductBrandRepository, ProxyProductCategoryRepository, RPCProductBrandRepository, RPCProductCategoryRepository } from "./infras/repository/rpc";

export function setupProductHexagon(sequelize: Sequelize) : Router {
    init(sequelize);    
    
    const productRepository = new MySQLProductRepository(sequelize, modelName)

    const productBrandRepository = new ProxyProductBrandRepository(new RPCProductBrandRepository(config.rpc.productBrand))
    const productCategoryRepository = new ProxyProductCategoryRepository(new RPCProductCategoryRepository(config.rpc.productCategory))
    
    const productUseCase = new ProductUseCase(productRepository, productBrandRepository, productCategoryRepository)

    const productHttpService = new ProductHttpService(productUseCase, productBrandRepository, productCategoryRepository)

    const router = Router();
    
    router.post('/products', productHttpService.createAPI.bind(productHttpService));
    router.get('/products/:id', productHttpService.getDetailAPI.bind(productHttpService));
    router.get('/products', productHttpService.listAPI.bind(productHttpService));
    router.patch('/products/:id', productHttpService.updateAPI.bind(productHttpService));
    router.delete('/products/:id', productHttpService.deleteAPI.bind(productHttpService));

    return router;
};