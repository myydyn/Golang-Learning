import express from "express";
import type { Request, Response } from "express";
import { config } from "dotenv";
import { z } from "zod";
import { v7 } from "uuid";
import { setupCategoryModule } from "./modules/category/index.js";
import { sequelize } from "./share/component/sequelize.js";

config();

(async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Express!");
  });

  app.use("/v1", setupCategoryModule(sequelize));

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
