import { Router } from "express";
import { Sequelize } from "sequelize";
import { MySQLBrandRespository } from "./infras/repository/sequelize/index.js";
import { init } from "./infras/repository/sequelize/dto.js";
import { BrandHttpService } from "./infras/transport/index.js";
import { CreateNewBrandCmdHandler } from "./usecase/create-new-brand.js";
import { DeleteBrandCmdHandler } from "./usecase/delete-brand.js";
import { GetBrandDetailQuery } from "./usecase/get-brand-detail.js";
import { ListBrandQuery } from "./usecase/list-brand.js";
import { UpdateBrandCmdHandler } from "./usecase/update-brand.js";

export const setupBrandHexagon = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new MySQLBrandRespository(sequelize);

  const createCmdHandler = new CreateNewBrandCmdHandler(repository);
  const getDetailQueryHandler = new GetBrandDetailQuery(repository);
  const updateCmdHandler = new UpdateBrandCmdHandler(repository);
  const deleteCmdHandler = new DeleteBrandCmdHandler(repository);
  const listQueryHandler = new ListBrandQuery(repository);

  const httpService = new BrandHttpService(
    createCmdHandler,
    getDetailQueryHandler,
    updateCmdHandler,
    deleteCmdHandler,
    listQueryHandler,
  );

  const router = Router();

  router.post("/brands", httpService.createAPI.bind(httpService));
  router.get("/brands/:id", httpService.getDetailAPI.bind(httpService));
  router.get("/brands", httpService.listAPI.bind(httpService));
  router.patch("/brands/:id", httpService.updateAPI.bind(httpService));
  router.delete("/brands/:id", httpService.deleteAPI.bind(httpService));

  return router;
};
