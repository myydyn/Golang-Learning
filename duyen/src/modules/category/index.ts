import { Router } from "express";
import { createCategoryApi } from "./infras/create-api.js";
import { deleteCategoryApi } from "./infras/delete-api.js";
import { getCategoryApi } from "./infras/get-api.js";
import { listCategoryApi } from "./infras/list-api.js";
import { updateCategoryApi } from "./infras/update-api.js";
import { init } from "./infras/repository/dto.js";
import type { Sequelize } from "sequelize";

export const setupCategoryModule = (sequelize: Sequelize) => {
  init(sequelize);

  const router = Router();

  router.get("/categories", listCategoryApi);
  router.get("/categories/:id", getCategoryApi);
  router.post("/categories", createCategoryApi);
  router.patch("/categories/:id", updateCategoryApi());
  router.delete("/categories/:id", deleteCategoryApi());

  return router;
};
